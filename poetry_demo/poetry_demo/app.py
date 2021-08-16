from flask import Flask

app = Flask(__name__)

@app.route('/')
def greeting():
    return 'THIS IS CRAZZYYY YALL'


app.run(host="0.0.0.0")

