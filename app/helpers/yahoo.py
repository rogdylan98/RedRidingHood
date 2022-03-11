import requests
import os

YAHOO_API_URL = 'https://yfapi.net'
api_key = os.getenv('YAHOO_API_KEY')

headers = {
    'x-api-key': api_key
    }

def get_price(ticker):
    path = "v6/finance/quote"
    querystring = {"symbols": ticker}
    response = requests.request("GET", f'{YAHOO_API_URL}/{path}', headers=headers, params=querystring)
    stock_data = response.json()['quoteResponse']['result'][0]
    price = stock_data['ask']
    return price
