from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Stock, List
from app.forms import ListForm
from app.api.auth_routes import validation_errors_to_error_messages

list_routes = Blueprint('lists', __name__)

@list_routes.route('/new', methods=['POST'])
# @login_required
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


@list_routes.route('/<int:userid>')
# @login_required
def get_user_lists(userid):
    user_lists = List.query.filter_by(userid=userid).all()
    return {l.id: l.to_dict() for l in user_lists}
