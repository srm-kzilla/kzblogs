from fastapi import FastAPI, Response, Request
from routes import admin, routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(admin.router, prefix="/admin", tags=["admin"])
app.include_router(routes.router, prefix="/api", tags=["api"])


@app.get("/")
async def root(request: Request):
    return Response("KZBLOGS API")
