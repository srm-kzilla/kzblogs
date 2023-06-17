from fastapi import FastAPI, Response, Request
from routes import crudRoutes

app = FastAPI()

app.include_router(crudRoutes.router, prefix="/blog")

@app.get("/")
async def root(req: Request) -> Response:
    return Response("KZBLOGS API V1.0", 200)

@app.get("/health")
async def healthcheck(request: Request) -> Response:
    """Check whether kz-blogs is running."""

    return Response("OK", 200)