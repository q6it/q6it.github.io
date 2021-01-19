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

from api import get_fund_amounts, get_price, create_order
from utils import check_type


# def place_pyramid(symbol, start_amount, start_price, side):
def place_pyramid(pyramid_params):
    side = pyramid_params['side']
    symbol = pyramid_params['symbol']
    sell_symbol = pyramid_params['sell_symbol']

    fee = 0.075*2
    step_amount = 1.005
    price = float(pyramid_params['start_price'])

    if side == 'BUY':
        start_price_now = price*(1-fee/100)
        step_percentage_value = 0.995
    if side == 'SELL':
        start_price_now = price * (1 + fee / 100)
        step_percentage_value = 1.005
    new_price = start_price_now
    print('new_price start', new_price)
    new_amount = pyramid_params['start_amount']
    locked_funds = 0

    while(locked_funds < pyramid_params['invest_limit']):
        print('locked_funds', locked_funds)
        print('invest_limit', pyramid_params['invest_limit'])
        if symbol == 'BTCDOWNUSDT':
            new_price = round((new_price * step_percentage_value), 4)
            new_amount = round((new_amount*step_amount), 2)
        else:
            new_price = round((new_price * step_percentage_value), 2)
            new_amount = round((new_amount * step_amount), 6)
        # print('new_price loop', new_price)
        # print('new_amount loop', new_amount)
        params = {
            "symbol": symbol,
            "side": side,
            "type": 'LIMIT',
            "timeInForce": 'GTC',
            "quantity": new_amount,
            "price": new_price
        }
        order_details = create_order(params)
        time.sleep(0.09)
        locked_funds = float(get_fund_amounts(sell_symbol)['locked'])
        print('locked_funds', locked_funds)
        if 'msg' in order_details:
            print(order_details['msg'])
            if order_details['msg'] == 'Account has insufficient balance for requested action.':
                break
        time.sleep(0.5)


# SETUP YOUR ORDERS
def get_pyramid_params():
    # symbol = 'BTCEUR'  # from input
    symbol = 'BTCDOWNUSDT'  # from input
    sell_symbol = 'USDT'  # TODO: manage this from pair
    side = 'BUY'  # from toggle 'BUY'/'SEL'
    current_price = get_price(symbol)
    print('current_price', current_price)

    invest_step_amount = 48  # from input
    start_amount = round(invest_step_amount / current_price, 10)
    print('start_amount', start_amount)

    invest_percentage = 100  # from slider input
    invest_percentage_value = invest_percentage / 100
    free_funds = float(get_fund_amounts(sell_symbol)['free'])
    print('free_funds', free_funds)
    invest_limit = free_funds * invest_percentage_value
    # orders_count = free_funds // invest_limit
    # print('orders_count', orders_count)
    print('invest_limit', invest_limit)

    return {
        "symbol": symbol,
        "start_amount": start_amount,
        "start_price": get_price(symbol),
        "side": side,
        # 'orders_count': orders_count,
        'invest_limit': invest_limit,
        'sell_symbol': sell_symbol
    }


input("Press Enter to continue...")
# START TRADE HERE

place_pyramid(get_pyramid_params())
# place_pyramid(symbol, start_amount, get_price(symbol), 'BUY')
# place_pyramid(symbol, 0.0005, float('29740'), 'SELL')
# cancel_all_order(symbol)


# LEGACY CODE
# symbol = 'BTCEUR'
# df = pd.DataFrame.from_records(get_all_orders(symbol))
# csv_name  = symbol + '.csv'
# df.to_csv(csv_name)

#
# orders = pd.DataFrame.from_records(get_all_orders(symbol))
# orders.to_csv('test2.csv')


# orders = pd.DataFrame.from_dict(get_all_orders(symbol))
# orders = pd.DataFrame.from_records(get_all_orders(symbol))
# orders.to_csv("test.csv")


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
