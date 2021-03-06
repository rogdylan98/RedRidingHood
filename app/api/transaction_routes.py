from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Stock, Transaction
from app.forms import TransactionForm
from app.api.auth_routes import validation_errors_to_error_messages

transaction_routes = Blueprint('transactions', __name__)



@transaction_routes.route('/new', methods=['POST'])
@login_required
def new_transaction():
    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    method = form.data['method']

    if form.validate_on_submit():
        user = User.query.get(form.data['userid'])
        current_shares = user.get_current_shares(form.data['stockid'])
        stockid = form.data['stockid']
        stock = Stock.query.get(stockid)

        if method == 'buy' and user.balance < form.data['share_value']:
            return {'errors': ['Error: Your purchasing power is not enough']}, 400
        if method == 'sell' and form.data['shares'] > current_shares:
            return {'errors': ['Error: You do not own enough shares for this transaction']}, 400
        user.update_balance(method, form.data['share_value'])
        prev_transaction = Transaction.query.filter_by(userid=user.id, stockid=form.data['stockid']).first()

        if current_shares == form.data['shares'] and method == 'sell':
            db.session.delete(prev_transaction)
            db.session.commit()
            return {
                "stock_ticker": stock.ticker,
                "shares": 0,
                "share_value": 0
            }

        if current_shares:
            if method == 'buy':
                prev_transaction.shares += form.data['shares']
                prev_transaction.share_value += form.data['share_value']
            else:
                prev_transaction.shares -= form.data['shares']
                prev_transaction.share_value -= form.data['share_value']
            db.session.commit()
            return prev_transaction.to_dict()

        transaction = Transaction(
            userid=form.data['userid'],
            stockid=form.data['stockid'],
            shares=form.data['shares'],
            share_value=form.data['share_value']
        )
        db.session.add(transaction)
        db.session.commit()
        return transaction.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@transaction_routes.route('/<int:userid>/<ticker>')
@login_required
def getUserTransactions(userid, ticker):
    stock = Stock.query.filter_by(ticker=ticker).first()
    transaction = Transaction.query.filter_by(userid=userid, stockid=stock.id).first()
    if transaction:
        return transaction.to_dict()
    return {
        "stock_ticker": ticker,
        "shares": 0,
        "share_value": 0
    }
