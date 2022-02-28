# RedRidingHood
RedRidingHood is a clone inspired by Robinhood that allows users to buy and sell stock.

# Live Site
[Red Riding Hood](https://redridinghood/herokuapp.com)

# Technologies Used
- Node.js
- React
- Redux
- Flask
- PostgreSQL
- SQLAlchemy
- Alembic

# Setup Instructions To Run

1. Clone the repository
2. Run the command `pipenv install` in the root directory
3. In the `/react-app` directory of the cloned repo, run `npm install` to install node dependencies
4. Create a PostgreSQL database and user for the app
5. Rename `/.env.EXAMPLE` to ".env", and fill out the values using the PostgreSQL information you just created
7. Run database migrations with the command `pipenv run flask db migrate`
8. Run the Flask backend server with the command `pipenv run flask run` in the root directory
9. In a new terminal, run `npm start` in the /react-app directory
10. The site should now be up on localhost:3000!
