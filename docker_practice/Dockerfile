# postgres image, base image
FROM python:3.8.2-slim

WORKDIR /app

COPY . .

RUN  pip install Flask





CMD ["python","backend/app.py","--host=0.0.0.0"]

