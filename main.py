from fastapi import FastAPI, Response, Request
from routes import adminRoutes, regularRoutes, userRoutes
from middleware import middleware

app = FastAPI(
    docs_url="/docs",
    openapi_url="/openapi.json"
)
middleware.verifyAuth(app)

app.include_router(regularRoutes.router, prefix="/blog")
app.include_router(adminRoutes.router, prefix="/admin")
app.include_router(userRoutes.router, prefix="/user")


@app.get("/")
async def root(req: Request) -> Response:
    return Response("KZBLOGS API V1.0", 200)


@app.get("/health")
async def healthcheck(request: Request) -> Response:
    """Check whether kz-blogs is running."""

    return Response("OK", 200)
