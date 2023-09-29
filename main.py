from fastapi import FastAPI, Response, Request
from routes import admin, routes
from middleware import verifyAuth

app = FastAPI()
app.include_router(admin.router, prefix="/admin", tags=["admin"])
app.include_router(routes.router, prefix="/api", tags=["api"])
verifyAuth(app)

@app.get("/")
async def root(request: Request):
    return Response("KZBLOGS API")
