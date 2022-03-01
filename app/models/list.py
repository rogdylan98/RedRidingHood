from .db import db
from sqlalchemy import DateTime
from sqlalchemy.sql import func
from app.models.stock import Stock
from app.models.liststock import list_stocks

class List(db.Model):
    __tablename__ = "lists"

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())
    user = db.relationship('User', back_populates='lists')
    stocks = db.relationship('Stock', secondary='list_stocks', lazy='subquery', backref=db.backref('lists', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'userid': self.userid,
            'name': self.name,
            'updated_at': self.updated_at,
        }
