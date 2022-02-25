from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app.models.transaction import Transaction

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    balance = db.Column(db.Float(2), default=10000)
    lists = db.relationship("List", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def update_balance(self, method, share_value):
        if method == 'buy':
            self.balance -= share_value
        elif method == 'sell':
            self.balance += share_value
        db.session.commit()

    def get_current_shares(self, stockid):
        current_owner = Transaction.query.filter_by(userid=self.id, stockid=stockid).all()
        if len(current_owner):
            shares = [e.shares for e in current_owner]
            return shares[0]
        return 0

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'name': self.name,
            'balance': self.balance
        }
