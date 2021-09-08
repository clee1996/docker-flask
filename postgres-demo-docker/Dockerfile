ARG VERSI=1.1.7

FROM python:3.8.2-slim

ARG VERSI

WORKDIR /projecttt

RUN pip install "poetry==$VERSI"

COPY poetry.lock pyproject.toml ./

RUN poetry config virtualenvs.create false

RUN poetry install

EXPOSE 5000

COPY . .

CMD ["python","postgres_demo_docker/app.py"]







