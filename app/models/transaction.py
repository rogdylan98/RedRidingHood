from .db import db
from sqlalchemy.sql import func
from sqlalchemy import DateTime, Float
from app.models.stock import Stock

class Transaction(db.Model):
    __tablename__ = 'transactions'
    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    stockid = db.Column(db.Integer, db.ForeignKey('stocks.id'), nullable=False)
    shares = db.Column(db.Float(2), nullable=False)
    share_value = db.Column(db.Float(2), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True),
                           onupdate=func.now(), server_default=func.now())

    def get_stock_by_id(self, id):
        stock = Stock.query.get(id)
        return stock.to_dict()

    def to_dict(self):
        stock = self.get_stock_by_id(self.stockid)
        return {
            'id': self.id,
            'userid': self.userid,
            'stock_name': stock['name'],
            'stock_ticker': stock['ticker'],
            'shares': self.shares,
            'share_value': self.share_value,
            'upated_at': self.updated_at
        }
