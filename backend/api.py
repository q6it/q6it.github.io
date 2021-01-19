import hmac
import time
import hashlib
import requests
import logging
import pandas as pd
import json
from urllib.parse import urlencode
import os
from os.path import join, dirname
from dotenv import load_dotenv

from utils import check_type

# logging.basicConfig(level=logging.DEBUG)

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

# LIVE keys
KEY = os.environ.get("BKEY")
SECRET = os.environ.get("BSECRET")
BASE_URL = os.environ.get("BURL")

# Sandbox keys
# KEY = os.environ.get("S_KEY")
# SECRET = os.environ.get("S_SECRET")
# BASE_URL = os.environ.get("S_URL")


''' ======  begin of functions, you don't need to touch ====== '''


def hashing(query_string):
    return hmac.new(SECRET.encode('utf-8'), query_string.encode('utf-8'), hashlib.sha256).hexdigest()


def get_timestamp():
    return int(time.time() * 1000)


def dispatch_request(http_method):
    session = requests.Session()
    session.headers.update({
        'Content-Type': 'application/json;charset=utf-8',
        'X-MBX-APIKEY': KEY
    })
    return {
        'GET': session.get,
        'DELETE': session.delete,
        'PUT': session.put,
        'POST': session.post,
    }.get(http_method, 'GET')

# used for sending request requires the signature


def send_signed_request(http_method, url_path, payload={}):
    query_string = urlencode(payload, True)
    print(query_string)
    if query_string:
        query_string = "{}&timestamp={}".format(query_string, get_timestamp())
    else:
        query_string = 'timestamp={}'.format(get_timestamp())

    url = BASE_URL + url_path + '?' + query_string + \
        '&signature=' + hashing(query_string)
    print("{} {}".format(http_method, url))
    params = {'url': url, 'params': {}}
    response = dispatch_request(http_method)(**params)
    # check_type(r)
    return response.json()

# used for sending public data request


def send_public_request(url_path, payload={}):
    query_string = urlencode(payload, True)
    url = BASE_URL + url_path
    if query_string:
        url = url + '?' + query_string
    print("{}".format(url))
    response = dispatch_request('GET')(url=url)
    return response.json()


''' ======  end of functions ====== '''

### public data endpoint, call send_public_request #####
# get klines


### USER_DATA endpoints, call send_signed_request #####
# get account informtion
# if you can see the account details, then the API key/secret is correct

def get_balances():
    r = send_signed_request('GET', '/api/v3/account')
    balances = r['balances']
    dfbalances = pd.DataFrame.from_dict(balances)
    # print('dfbalances', dfbalances)
    # print('USER_DATA:', pd.DataFrame.from_dict(r))
    return balances


def create_order(paramsDict):
    params = {
        "symbol": paramsDict['symbol'],
        "side": paramsDict['side'],
        "type": paramsDict["type"],
        "timeInForce": paramsDict["timeInForce"],
        "quantity": paramsDict['quantity'],
        "price": paramsDict['price'],
    }
    response = send_signed_request('POST', '/api/v3/order', params)
    print('DEBUGGING Create order response', response)
    return response


def get_price(symbol):
    response = send_public_request('/api/v3/ticker/price', {'symbol': symbol})
    return float(response['price'])


def get_all_orders(symbol):
    params = {
        'symbol': symbol
    }
    r = send_signed_request('GET', '/api/v3/allOrders', params)
    # print(pd.DataFrame.from_dict(r))
    # test_data = pd.DataFrame(pd.read_json(r))
    # print('orders:', test_data)
    # print(r)
    return r


def cancel_all_order(symbol):
    params = {
        'symbol': symbol
    }
    r = send_signed_request('DELETE', '/api/v3/openOrders', params)
    return r


def get_fund_amounts(sell_symbol):
    balances = get_balances()
    for asset in balances:
        # print('DEBUGGING', obj)
        for key, val in asset.items():
            if val == sell_symbol:
                # print('found', obj)
                amounts = {
                    "free": asset['free'],
                    "locked": asset['locked']
                }
                return amounts
