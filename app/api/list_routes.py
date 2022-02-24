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
        user = User.query.get(form.data['userid'])
        listname = List.query.filter_by(name=form.data['listname']).all()
        if len(listname):
            return {'errors': ['Bad data:', '* Each list name must be unique']}, 400
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
    return {l.id: l.to_dict() for l in user_lists}


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
        new_list.name = form.data['listname']
        db.session.commit()
        return new_list.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages}, 401

@list_routes.route('/<int:listid>/stocks')
@login_required
def get_stocks_in_list(listid):
    my_list = List.query.get(listid)
    entry_list = list_stocks.query.filter_by(listid=listid).all()
    return my_list.get_stocks(entry_list)

@list_routes.route('/<int:listid>/<int:stockid>', methods=['POST'])
@login_required
def add_stock_to_list(listid, stockid):
    if len(db.session.query(list_stocks).filter_by(listid=listid, stockid=stockid).all()):
        return {'errors': 'This stock is already in this list'}
    new_entry = list_stocks.insert().values(listid=listid, stockid=stockid)
    db.session.add(new_entry)
    db.session.commit()
    return "success", 200

@list_routes.route('/<int:listid>/<int:stockid>', methods=['DELETE'])
@login_required
def delete_stock_from_list(listid, stockid):
    if not len(list_stocks.query.filter_by(listid=listid, stockid=stockid).all()):
        return {'errors': 'This stock was not in the list'}
    entry = list_stocks.query.filter_by(listid=listid, stockid=stockid).first()
    db.session.delete(entry)
    db.session.commit()
    return "succes", 200
