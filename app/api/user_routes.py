from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Transaction, Stock

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/transactions')
@login_required
def get_stocks(id):
    transactions = Transaction.query.filter_by(userid=id).all()
    our_transactions = [{'name': Stock.query.get(t.stockid).name, 'shares': t.shares, 'share_value': t.share_value, 'ticker': Stock.query.get(t.stockid).ticker} for t in transactions]
    return {'transactions': our_transactions}

@user_routes.route('/<int:id>/portfolio')
@login_required
def get_port_value(id):
    transactions = Transaction.query.filter_by(userid=id).all()
    stocks = sum(transaction.share_value for transaction in transactions)
    return {'stocks': stocks}
