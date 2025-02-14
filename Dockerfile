FROM python:3.9-slim-buster

WORKDIR /app
COPY pyproject.toml /app
COPY poetry.lock /app
RUN pip install poetry==1.8.1
RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction
COPY ./ /app

ENV PYTHONPATH=/app
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--port=8000"]
