from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


class ListForm(FlaskForm):
    userid = IntegerField(
        'userid', validators=[DataRequired()])
    listname = StringField('listname', validators=[DataRequired()])
