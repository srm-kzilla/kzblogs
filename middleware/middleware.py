from fastapi import FastAPI, Request


def init_middleware(app: FastAPI):
    @app.middleware("http")
    async def log_request(request: Request, call_next):
        response = await call_next(request)
        return response
