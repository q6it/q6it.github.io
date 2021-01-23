import hmac
import time
from datetime import datetime
import hashlib
import requests
import logging
import pandas as pd
import json
from urllib.parse import urlencode
import os
from os.path import join, dirname
from dotenv import load_dotenv

# noinspection PyUnresolvedReferences
from bapi import get_fund_amounts, get_price, create_order, get_balances, get_all_orders

pd.set_option("display.max_rows", None, "display.max_columns", None)

# def place_pyramid(symbol, start_amount, start_price, side):
def place_pyramid(pyramid_params):
    side = pyramid_params['side']
    symbol = pyramid_params['symbol']
    sell_symbol = pyramid_params['sell_symbol']
    fee = pyramid_params['fee']*2
    step_amount = pyramid_params['step_amount']
    batch_id = 0
    spent_funds = 0
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

    while(spent_funds < pyramid_params['invest_limit']):
        print('invest_limit', pyramid_params['invest_limit'])
        if symbol == 'BTCDOWNUSDT':
            new_price = round((new_price * step_percentage_value), 4)
            new_amount = round((new_amount*step_amount), 2)
        else:
            new_price = round((new_price * step_percentage_value), 2)
            new_amount = round((new_amount * step_amount), 6)
        # print('new_price loop', new_price)
        # print('new_amount loop', new_amount)
        spent_funds = spent_funds + new_price*new_amount
        print('spentfunds',spent_funds)
        order_params = {
            "symbol": symbol,
            "side": side,
            "type": 'LIMIT',
            "timeInForce": 'GTC',
            "quantity": new_amount,
            "price": new_price
        }
        order_details = create_order(order_params)
        if 'msg' in order_details:
            print(order_details['msg'])
            if order_details['msg'] == 'Account has insufficient balance for requested action.':
                break
        # print('before', order_details)
        order_details['order_total'] = float(order_details['price'])*float(order_details['origQty'])
        order_details['batch_id'] = batch_id + 1
        # print('after', order_details)
        orders_list.append(order_details)
        time.sleep(0.09)
        locked_funds = float(get_fund_amounts(sell_symbol)['locked'])
        # print('locked_funds', locked_funds)

        time.sleep(0.5)


# SETUP YOUR ORDERS

def update_pyramid_params(pyramid_params):
    start_amount = round(pyramid_params['invest_step_amount'] / pyramid_params['start_price'], 8)
    invest_percentage_value = pyramid_params['invest_percentage'] / 100
    free_funds = float(get_fund_amounts(pyramid_params['sell_symbol'])['free'])
    invest_limit = free_funds * invest_percentage_value
    # orders_count = free_funds // invest_limit
    # print('orders_count', orders_count)
    order_details = {
        "symbol": pyramid_params['symbol'],
        "start_amount": start_amount,
        "start_price": pyramid_params['start_price'],
        "side": pyramid_params['side'],
        # 'orders_count': orders_count,
        'invest_limit': invest_limit,
        'sell_symbol': pyramid_params['sell_symbol'],
        'fee': pyramid_params['fee'],
        'step_amount': pyramid_params['step_amount']
    }
    # print(order_details)
    return order_details

input("Press Enter to continue...")

start_params = {
"symbol" : 'BTCDOWNUSDT',
"sell_symbol" : 'USDT',
"side" : 'BUY',
"start_price" : 0.3061,
"invest_step_amount" : 50,
"invest_percentage" : 90,
'fee' : 0.075,
'step_amount' : 1.005
}


# START TRADE HERE

orders_list = []
updated_params = update_pyramid_params(start_params)
place_pyramid(updated_params)

sum_amount = sum(float(row['origQty']) for row in orders_list)
sum_total = sum(row['order_total'] for row in orders_list)

total_now = sum_amount*get_price('BTCUSDT')
# total_now = 100
percent_change = (total_now/sum_total-1)*100
profit = total_now-sum_total
df = pd.DataFrame.from_records(orders_list)
print(df)
# print(datetime.now())
# timestr = time.strftime("%Y%m%d-%H%M%S")+'.csv'
# print(timestr)
# df.to_csv(timestr)
# df = pd.read_csv(timestr)
#
print('profit', profit)
print('sum_amount',sum_amount)
print('sum_total',sum_total)
print('total_now',total_now)


# symbol='BTCUSTD'
# print(get_balances())
# print(get_price())
# print(get_all_orders())

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

