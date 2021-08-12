from flask import Flask

app = Flask(__name__)

@app.route('/')
def greeting():
    return 'this is a test with flask and docker'

if __name__ == '__main__':
    app.run(debug=True)
