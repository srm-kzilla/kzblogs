from fastapi import FastAPI, Request
from helpers.response import Response
from helpers.constants import IGNORED_ROUTES
from database import MongoDBConnection as Database
from typing import Callable

is_ignored = lambda x: any([x.startswith(i) for i in IGNORED_ROUTES])


def verify_auth(app: FastAPI):
    db = Database()

    @app.middleware("http")
    async def verify_auth(request: Request, call_next: Callable):
        if is_ignored(request.url.path):
            pass
        elif (
            is_admin_path := request.url.path.startswith("/admin")
        ) or request.url.path.startswith("/api"):
            if request.method != "OPTIONS":
                if "x-session-id" not in request.headers:
                    return Response(
                        {"status": False, "message": "Session ID not found"},
                        status_code=403,
                    )
                user = await db.users.verify_session(
                    session_id=request.headers["x-session-id"]
                )
                if not user:
                    return Response(
                        {"status": False, "message": "Invalid session ID"},
                        status_code=403,
                    )
                if is_admin_path and not user.get("is_admin", False):
                    return Response(
                        {"status": False, "message": "Only admin can access this path"},
                        status_code=403,
                    )
        try:
            return await call_next(request)
        except Exception as e:
            print(e)
            return Response(
                {"status": False, "message": "Oops! Something went wrong"},
                status_code=500,
            )
