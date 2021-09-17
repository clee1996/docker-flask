import os
import logging
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_bcrypt import Bcrypt
import sys

uri = os.environ['SQLALCHEMY_DATABASE_URI']
app = Flask(__name__)
app.config["JWT_SECRET_KEY"]= b'lS\x16\xf2\xab]\xe9o`\xfa\x03M\xc1\x984\xcd'
app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)
cors = CORS(app, resources= {r'/api/*': {"origins": "*"}})
logging.getLogger('flask_cors').level = logging.DEBUG


### Models ###
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(80), nullable=False)
    title = db.Column(db.String(80), nullable=False)
    synopsis = db.Column(db.String(180), nullable=False)
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'))


class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    authenticated = db.Column(db.Boolean, default=False)
    books = db.relationship('Book', backref='person', lazy=True)

    def is_active(self):
        return True

    def get_id(self):
        return self.username

    def is_authenticated(self):
        return self.authenticated

    def is_anonymous(self):
        return False


### Schemas  ###
class BookSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Book
    id = ma.auto_field()
    author = ma.auto_field()
    title = ma.auto_field()
    synopsis = ma.auto_field()
    person_id = ma.auto_field()

class PersonSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Person
    id = ma.auto_field()
    username = ma.auto_field()
    password = ma.auto_field()
    books = ma.auto_field()


@app.route("/api/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token)

@app.route('/api/login', methods=['POST'])
def create_token():
    content = request.get_json(force=True)
    username = content['username']
    password = content['password']
    #modify test logic later
    user = Person.query.filter_by(username=username).first()
    if user is None:
        return jsonify({"msg": "Wrong Username"})
    else:
        user_schema = PersonSchema()
        res = user_schema.dump(user)
        pass_hash = user.password
        result = bcrypt.check_password_hash(pass_hash, password)
        if result is False:
            return jsonify({"msg": "Wrong Password"})
        else:
            #default 15 min
            access_token = create_access_token(identity=username)
            return jsonify(access_token=access_token, user=res)

@app.route('/api/register', methods=['POST'])
def register():
    content = request.get_json(force=True)
    username = content['username']
    password = content['password']
    user = Person.query.filter_by(username=username).first()
    if user is None:
        pw_hash = bcrypt.generate_password_hash(password).decode('utf8')
        user = Person(username=username, password=pw_hash, authenticated=True)
        db.session.add(user)
        db.session.commit()
        person_schema = PersonSchema()
        output = person_schema.dump(user)
        return jsonify(output)


    else:
        return jsonify({"msg": "username is taken"})





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


@app.route('/api/bookspost', methods=['POST'])
@jwt_required()
def bookPost():
    content = request.get_json(force=True)
    author = content["author"]
    title = content['title']
    synopsis = content['synopsis']
    book = Book(author=author, title=title, synopsis=synopsis)
    books_schema = BookSchema()
    output = books_schema.dump(book)
    db.session.add(book)
    db.session.commit()

    return jsonify(output), 200



db.create_all()
app.run(host="0.0.0.0")
