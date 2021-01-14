import hmac
import time
import hashlib
import requests
import pandas as pd
import json
from urllib.parse import urlencode

KEY = 'apikey'
SECRET = 'secret'
# BASE_URL = 'https://api.binance.com' # production base url
BASE_URL = 'https://testnet.binance.vision'  # testnet base url
# %%
print('hello')
# Utility


def checkType(x):
    print(type(x))


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
    # checkType(r)
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

# response = send_public_request('/api/v3/ticker/price', {'symbol': 'BTCUSDT'})
# print(response)

### USER_DATA endpoints, call send_signed_request #####
# get account informtion
# if you can see the account details, then the API key/secret is correct


def getbalances():
    r = send_signed_request('GET', '/api/v3/account')
    balances = r['balances']
    dfbalances = pd.DataFrame.from_dict(balances)
    return dfbalances


def create_order(paramsDict, quantity, price):
    params = {
        "symbol": paramsDict['symbol'],
        "side": paramsDict['side'],
        "type": paramsDict["type"],
        "timeInForce": paramsDict["timeInForce"],
        "quantity": quantity,
        "price": price,
    }
    response = send_signed_request('POST', '/api/v3/order', params)
    return response


def getPrice():
    return 35000

# def cancel_all_order(symbol):
#     r = send_signed_request('DELETE','api/v3/openOrders?symbol='+symbol)
#     return r
# # DELETE https://testnet.binance.visionapi/v3/openOrders?symbol=BTCUSDT?timestamp=1609976874448&signature=ebf9ddb4c19b84c259966649095039d2f9595e10a30f4d0f6ae24821641ecf0f
#
#


def cancel_all_order(symbol):
    params = {
        'symbol': symbol
    }
    r = send_signed_request('DELETE', '/api/v3/openOrders', params)
    return r


#
fee = 0.75*2
start_price_now = getPrice()*(1-fee/100)
# # start_price_custom = 35000
start_amount = 0.001
amount = start_amount
# step_price = 0.99
# step_amount = 1.01
new_price = start_price_now
#
symbol = 'BTCUSDT'
#
#
test_dict = params = {
    "symbol": symbol,
    "side": 'BUY',
    "type": 'LIMIT',
    "timeInForce": 'GTC',
}
print(create_order(test_dict, amount, new_price))
#
# while(True):
#     new_price = round((new_price*step_price),2)
#     print(new_price)
#     amount = 0.1
#     order_details = create_order(test_dict, amount, new_price)
#     print(order_details)
symbol = 'BTCUSDT'
print(cancel_all_order(symbol))
print(getbalances())


# while(True):
#     params = {
#         "symbol": "BNBUSDT",
#         "side": "BUY",
#         "type": "LIMIT",
#         "timeInForce": "GTC",
#         "quantity": 1,
#         "price": buyprice
#     }
#     createOrder()
#
#
# orderinfo = createOrder(params)
# orderid = orderinfo['orderId']
# order_price = orderinfo['price']


#
#
# # # place an order
# # if you see order response, then the parameters setting is correct

# response = send_signed_request('POST', '/api/v3/order', params)
# print(response)
#
#
# # transfer funds
# params = {
#     "fromEmail": "",
#     "toEmail": "",
#     "asset": "USDT",
#     "amount": "0.1"
# }
# response = send_signed_request('POST', '/wapi/v3/sub-account/transfer.html', params)
# print(response)
#
#
# # New Future Account Transfer (FUTURES)
# params = {
#     "asset": "USDT",
#     "amount": 0.01,
#     "type": 2
# }
# response = send_signed_request('POST', '/sapi/v1/futures/transfer', params)
# print(response)
# %%


