from .db import db
from sqlalchemy import Float, DateTime
from ..helpers.yahoo import get_price
import datetime as dt

class Stock(db.Model):
    __tablename__ = "stocks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    ticker = db.Column(db.String(5), nullable=False, unique=True)
    price = db.Column(db.Float(2), nullable=False)
    description = db.Column(db.String(2200), nullable=False)
    updated = db.Column(db.DateTime(timezone=False))


    def update_price(self):
        current_time = dt.datetime.now()
        hour = dt.timedelta(hours=1)
        if not self.updated or current_time - self.updated > hour:
            self.price = get_price(self.ticker)
            self.updated = current_time
            db.session.commit()
        return self


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ticker': self.ticker,
            'price': self.price,
            'description': self.description,
            'updated': self.updated
        }
