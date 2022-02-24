from .db import db

list_stocks = db.Table("list_stocks",
db.Column("listid", db.Integer, db.ForeignKey("lists.id")),
db.Column("stockid", db.Integer, db.ForeignKey("stocks.id"))
)

# class ListStock(db.Model):
#     __tablename__ = 'liststocks'

#     id = db.Column(db.Integer, primary_key=True)
#     listid = db.Column(db.Integer, db.ForeignKey('lists.id'))
#     stockid = db.Column(db.Integer, db.ForeignKey('stocks.id'))
