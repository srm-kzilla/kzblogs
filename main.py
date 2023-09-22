from fastapi import FastAPI, Response, Request
from routes import admin, routes

app = FastAPI()
app.include_router(admin.router, prefix="/admin")
app.include_router(routes.router, prefix="/api")


@app.get("/")
async def root():
    return Response("KZBLOGS API")
