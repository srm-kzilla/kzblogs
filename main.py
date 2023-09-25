from fastapi import FastAPI, Response, Request
from routes import admin

app = FastAPI()
app.include_router(admin.router, prefix="/admin", tags=["admin"])


@app.get("/")
async def root():
    return Response("KZBLOGS API")
