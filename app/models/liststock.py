from .db import db


class ListStock(db.Model):
    __tablename__ = "liststocks"

    listid = db.Column(db.Integer, db.ForeignKey("lists.id"), nullable=False)
    stockid = db.Column(db.Integer, db.ForeignKey("stocks.id"), nullable=False)
