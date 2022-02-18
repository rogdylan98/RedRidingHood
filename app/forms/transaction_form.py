from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, DecimalField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


class TransactionForm(FlaskForm):
    userid = IntegerField(
        'userid', validators=[DataRequired()])
    stockid = IntegerField('stockid', validators=[DataRequired()])
    shares = FloatField('shares', validators=[DataRequired()])
    share_value = FloatField('share_value', validators=[DataRequired()])
    method = StringField('method', validators=[DataRequired()])
