from fastapi import FastAPI, Response, Request
from routes import admin, routes
from middleware import verify_auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["all"],
    allow_credentials=True,
    allow_methods=["all"],
    allow_headers=["all"]
)
app.include_router(admin.router, prefix="/admin", tags=["admin"])
app.include_router(routes.router, prefix="/api", tags=["api"])
verify_auth(app)


@app.get("/")
async def root(request: Request):
    return Response("KZBLOGS API")

