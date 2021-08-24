import os
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

uri = os.environ["SQLALCHEMY_DATABASE_URI"]
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class People(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pname = db.Column(db.String(80), unique=True, nullable=False)
    color = db.Column(db.String(120), nullable=False)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128))

@app.route('/')
def greeting():
    return '<a href="/addperson"><button>Click me</button></a>'

@app.route('/addperson')
def addperson():
    return render_template("index.html")

@app.route('/personadd', methods=['POST'])
def personadd():
    personname = request.form["pname"]
    color = request.form["color"]
    entry = People(pname=personname, color=color)
    db.session.add(entry)
    db.session.commit()

    return render_template("index.html")


if __name__ == "__main__":
    db.create_all()
    app.run(host="0.0.0.0")
