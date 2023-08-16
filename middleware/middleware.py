from fastapi import FastAPI, Request, Response
from security import jwtHandler
from json import dumps
from helpers.constants import ALLOWED_URLS

check = lambda request: any([request.url.path.startswith(url) for url in ALLOWED_URLS])


def verifyAuth(app: FastAPI):
    @app.middleware("http")
    async def log_request(request: Request, call_next):
        auth = request.headers.get("authorization")
        if check(request):
            response = await call_next(request)
            return response
        if not auth:
            return Response(dumps({"status": False, "message": "No token provided"}))
        else:
            verify = jwtHandler.decodeJWT(auth)
            if not verify:
                return Response(dumps({"status": False, "message": "Invalid token"}))
            else:
                if request.url.path.startswith("/admin"):
                    if verify["role"] != "admin":
                        return Response(
                            dumps(
                                {
                                    "status": False,
                                    "message": "You are not allowed to access this resource",
                                }
                            )
                        )
                response = await call_next(request)
                return response
