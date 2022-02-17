from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Stock, Transaction

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/<ticker>')
# @login_required
def get_stock_by_ticker(ticker):
    stock = Stock.query.filter_by(ticker=ticker).first()
    return stock.to_dict()
