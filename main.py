from fastapi import FastAPI, Request, Response
from json import dumps

app = FastAPI()

@app.get("/")
async def root():
    return Response("KZBLOGS API")