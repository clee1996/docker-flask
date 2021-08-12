from flask import Flask
from flask_sqlalchemy import SQLAlchemy

import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = ''
db = SQLAlchemy(app)

@app.route('/')
def greeting():
    return 'good day to you mate'

#means if we run this specific file then run the app
if __name__ == '__main__':
    app.run(debug=True)
