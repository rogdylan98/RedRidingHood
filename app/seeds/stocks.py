from app.models import db, Stock

def seed_stocks():
    amazon = Stock(
        name="Amazon", ticker="AMZN", price=3126.56, description="Market Cap: $1,561.59B")
    meta = Stock(
        name="Meta", ticker="FB", price=221.00, description="Market Cap: $601.55B")
    microsoft = Stock(
        name="Microsoft", ticker="MSFT", price=300.47, description="Market Cap: $2.25T")
    google = Stock(
        name="Alphabet Inc", ticker="GOOGL", price=2732.17, description="Market Cap: $1.8T")
    nvidia = Stock(
        name="NVIDIA Corp", ticker="NVDA", price=265.80, description="Market Cap: $606.67B")
    tesla = Stock(
        name="Tesla", ticker="TSLA", price=813.67, description="Market Cap: $840.91B"
    )
    amc = Stock(
        name='AMC Entertainment', ticker="AMC", price=17.41, description="Market Cap: 8.95B"
    )
    ford = Stock(
        name="Ford Motor", ticker="F", price=17.78, description="Market Cap: 70.73B"
    )
    disney = Stock(
        name="Disney", ticker="DIS", price=149.86, description="Market Cap: 272.38B"
    )

    db.session.add(amazon)
    db.session.add(meta)
    db.session.add(google)
    db.session.add(microsoft)
    db.session.add(nvidia)
    db.session.add(tesla)
    db.session.add(amc)
    db.session.add(ford)
    db.session.add(disney)
    db.session.commit()

def undo_stocks():
    db.session.execute('TRUNCATE stocks RESTART IDENTITY CASCADE;')
    db.session.commit()
