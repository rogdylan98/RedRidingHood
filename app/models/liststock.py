from .db import db

liststocks = db.Table("list_stocks",
db.Column("listid", db.Integer, db.ForeignKey("lists.id")),
db.Column("stockid", db.Integer, db.ForeignKey("stocks.id"))
)
