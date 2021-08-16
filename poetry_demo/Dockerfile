FROM python:3.8.2-slim

WORKDIR /app

RUN pip install "poetry==1.1.7"

COPY poetry.lock pyproject.toml /app/

#turn off virtualenv creation in poetry because docker is already an isolated enviornment
RUN poetry config virtualenvs.create false \
  && poetry install

COPY . /app

CMD ["python","poetry_demo/app.py"]


