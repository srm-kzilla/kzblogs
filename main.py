from fastapi import FastAPI, Response, Request
from routes import regularRoutes, adminRoutes

app = FastAPI()

app.include_router(regularRoutes.router, prefix="/blog")
app.include_router(adminRoutes.router, prefix="/admin")


@app.get("/")
async def root(req: Request) -> Response:
    return Response("KZBLOGS API V1.0", 200)


@app.get("/health")
async def healthcheck(request: Request) -> Response:
    """Check whether kz-blogs is running."""

    return Response("OK", 200)
