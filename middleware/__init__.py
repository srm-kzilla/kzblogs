from fastapi import FastAPI, Request
from helpers.response import Response
from database import MongoDBConnection as Database
from typing import Callable


def verifyAuth(app: FastAPI):
    db = Database()

    @app.middleware("http")
    async def verify_auth(request: Request, call_next: Callable):
        request.session_user = None
        if (
            is_admin_path := request.url.path.startswith("/admin")
        ) or request.url.path.startswith("/api"):
            if "sessionID" not in request.headers:
                return Response(
                    {"status": False, "message": "Session ID not found"},
                    status_code=403,
                )
            user = db.users.verify_session(session_id=request.headers["sessionID"])
            if not user:
                return Response(
                    {"status": False, "message": "Invalid session ID"}, status_code=403
                )
            if is_admin_path and not user.get("is_admin", False):
                return Response(
                    {"status": False, "message": "Only admin can access this path"},
                    status_code=403,
                )
            request.session_user = user
        response: Response = await call_next(request)
        if response.status_code == 500:
            return Response(
                {"status": False, "message": "Oops! Something went wrong"},
                status_code=500,
            )
        return response
