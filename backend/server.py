import requests
import sys
from flask_cors import CORS, cross_origin
from flask import Flask, Response, request
from urllib.parse import urlencode
import os
from os.path import join, dirname
from dotenv import load_dotenv

from main import send_public_request, get_all_orders

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)


# print(sys.path, file=sys.stdout)
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# KEY = os.environ.get("KEY")
# SECRET = os.environ.get("SECRET")

# BASE_URL = 'https://api.binance.com' # production base url
# BASE_URL = 'https://testnet.binance.vision'  # testnet base url

symbol = 'BTCEUR'


@app.route('/ticker', methods=['POST'])
@cross_origin()
def get_btc_usd():
    symbol = request.json
    print(symbol,  file=sys.stdout)
    r = send_public_request('/api/v3/ticker/price', symbol)
    print(r, file=sys.stdout)
    return {'response': r}


@app.route('/orders', methods=['POST'])
@cross_origin()
def get_orders():
    return get_all_orders(symbol)
