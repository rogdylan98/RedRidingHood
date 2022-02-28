from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Stock, List, list_stocks
from app.forms import ListForm
from app.forms.edit_list_form import EditListForm
from app.api.auth_routes import validation_errors_to_error_messages

list_routes = Blueprint('lists', __name__)

@list_routes.route('/new', methods=['POST'])
@login_required
def new_list():
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = current_user
        listname = List.query.filter_by(name=form.data['listname'], userid=user.id).all()
        if len(listname):
            return {'errors': ['Each list name must be unique.']}, 400
        if len(form.data['listname']) > 50:
            return {'errors': ['List name must not be more than 50 characters.']}, 400
        new_list = List(
            userid=form.data['userid'],
            name=form.data['listname'],
        )
        db.session.add(new_list)
        db.session.commit()
        return new_list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@list_routes.route('/<int:userid>/all')
@login_required
def get_user_lists(userid):
    user_lists = List.query.filter_by(userid=userid).all()
    if user_lists:
        return {l.id: l.to_dict() for l in user_lists}
    return {}

@list_routes.route('/<int:listid>')
@login_required
def get_list_by_id(listid):
    my_list = List.query.filter_by(id=listid).first()
    return my_list.to_dict()

@list_routes.route('/<int:listid>', methods=["DELETE"])
@login_required
def delete_list(listid):
    deleted_list = List.query.get(listid)
    db.session.delete(deleted_list)
    db.session.commit()
    return "success", 200


@list_routes.route('/<int:listid>', methods=["PUT"])
@login_required
def edit_list(listid):
    form = EditListForm()
    new_list = List.query.get(listid)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = current_user
        listname = List.query.filter_by(name=form.data['listname'], userid=user.id).all()
        if len(listname):
            return {'errors': ['Each list name must be unique']}, 400
        if len(form.data['listname']) > 50:
            return {'errors': ['List name must not be more than 50 characters']}, 400
        new_list.name = form.data['listname']
        db.session.commit()
        return new_list.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages}, 401

@list_routes.route('/<int:listid>/stocks')
@login_required
def get_stocks_in_list(listid):
    my_list = List.query.get(listid)
    if my_list:
        my_stocks = [stock.to_dict() for stock in my_list.stocks]
        return {'stocks': my_stocks}


@list_routes.route('/<ticker>')
@login_required
def get_lists_by_ticker(ticker):
    stock = Stock.query.filter_by(ticker=ticker).first()
    user_lists = List.query.filter_by(userid=current_user.id)
    my_lists = [l.to_dict() for l in stock.lists if l in user_lists]
    return {'lists': my_lists}

@list_routes.route('/<int:listid>/<int:stockid>', methods=['POST'])
@login_required
def add_stock_to_list(listid, stockid):
    my_list = List.query.get(listid)
    my_stock = Stock.query.get(stockid)
    if my_stock:
        for stock in my_list.stocks:
            if stock.id == stockid:
                return {"errors": ["This stock is already in your list"]}, 400
    my_list.stocks.append(my_stock)
    db.session.add(my_list)
    db.session.commit()
    return get_lists_by_ticker(my_stock.ticker)

@list_routes.route('/<int:listid>/<int:stockid>', methods=['DELETE'])
@login_required
def delete_stock_from_list(listid, stockid):
    # if not len(list_stocks.query.filter_by(listid=listid, stockid=stockid).all()):
    #     return {'errors': 'This stock was not in the list'}
    my_list = List.query.get(listid)
    my_stock = Stock.query.get(stockid)
    my_list.stocks.remove(my_stock)
    db.session.add(my_list)
    db.session.commit()
    return "succes", 200
