from app.models import db, User


def seed_users():
    demo = User(
        username='Demo', name='Demo AA', email='demo@aa.io', password='password', balance=10000000.00)
    marnie = User(
        username='marnie', name='Marnie AA', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', name='Bobbie AA', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()

def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
