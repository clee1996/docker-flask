import pytest
from flask import Flask

def test_greeting(db_session):
    row = db_session.query(Recipe).get(1)
    row.set_name = ('testing')
    assert row.name == 'testing'
