FROM python:3.9-slim-buster

WORKDIR /app
COPY ./ /app
RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction

ENV PYTHONPATH=/app
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--port=8000"]