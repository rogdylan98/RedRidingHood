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


@user_routes.route('/<int:id>/stocks')
@login_required
def get_stocks(id):
    transactions = Transaction.query.filter_by(userid=id).all()
    stocks = [Stock.query.get(transaction.stockid).to_dict() for transaction in transactions]
    return {'stocks': stocks}

@user_routes.route('/<int:id>/portfolio')
# @login_required
def get_port_value(id):
    transactions = Transaction.query.filter_by(userid=id).all()
    stocks = sum(transaction.share_value for transaction in transactions)
    return {'stocks': stocks}
