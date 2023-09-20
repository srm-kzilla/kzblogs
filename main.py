from fastapi import FastAPI, Request, Response
from json import dumps
from routes import routes, admin

app = FastAPI(version="1.0.0")
app.include_router(routes.router, prefix="/api/v1")
app.include_router(admin.router, prefix="/api/v1/admin")


@app.get("/")
async def root():
    return Response("KZBLOGS API")
