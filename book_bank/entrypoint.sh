#!/bin/sh

cd book_bank
flask db migrate -m "second migration added foreign keys and book relationship"
flask db upgrade
python app.py


