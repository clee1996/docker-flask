import pytest
import flask from Flask

@pytest.fixture
def app():
    app = Flask(__name__)
    return app


