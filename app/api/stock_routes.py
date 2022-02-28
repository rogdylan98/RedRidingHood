from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Stock, Transaction
from sqlalchemy import or_
stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/<ticker>')
@login_required
def get_stock_by_ticker(ticker):
    stock = Stock.query.filter_by(ticker=ticker).first()
    return stock.to_dict()

@stock_routes.route('/search/<substring>')
def get_stock_by_substring(substring):
    stocks = Stock.query.filter(or_(Stock.name.contains(substring),Stock.ticker.contains(substring))).all()
    all_stocks = { stock.id: stock.to_dict() for stock in stocks}
    return all_stocks

@stock_routes.route('')
# @login_required
def get_all_stocks():
    stocks = Stock.query.all()
    return {'stocks': [stock.to_dict() for stock in stocks]}
