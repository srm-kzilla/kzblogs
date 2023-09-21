from fastapi import FastAPI, Response, Request

app = FastAPI()

@app.get("/")
async def root():
    return Response("KZBLOGS API")