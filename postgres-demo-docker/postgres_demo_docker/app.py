from flask import Flask
from flask_sqlalchemy import SQLalchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://test:test@dbtest/rando'

db = SQLAlchemy(app)


class Post(db.model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    body = db.Column(db.String(128))

class User(db.model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128))

app.run(host='0.0.0.0')
