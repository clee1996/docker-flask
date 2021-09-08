import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

uri = os.environ['SQLALCHEMY_DATABASE_URI']
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)


### Models ###
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(80), nullable=False)
    title = db.Column(db.String(80), nullable=False)
    synopsis = db.Column(db.String(180), nullable=False)


### Schemas ###
class BookSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Book
    id = ma.auto_field()
    author = ma.auto_field()
    title = ma.auto_field()
    synopsis = ma.auto_field()


@app.route('/')
def greeting():
    return "Welcome to the book bank!"
### backend routes ###

@app.route('/api/books')
def index():
    book_schema = BookSchema()
    books = Book.query.all()
    output = book_schema.dump(books, many=True)
    return jsonify({"books":output})

@app.route('/api/books/<id>')
def bookInfo(id):
    books_schema = BookSchema()
    book = Book.query.get(id)
    output = books_schema.dump(book)
    return jsonify(output)



db.create_all()
app.run(host="0.0.0.0")
