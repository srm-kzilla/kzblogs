FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

COPY ./ /app
RUN pip install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction

EXPOSE 8000

CMD ["uvicorn", "main:app"]