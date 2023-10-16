from fastapi import Request, FastAPI
from helpers.response import Response
from database import MongoDBConnection as Database
from typing import Callable
from functools import wraps

db = Database()


def middleware(func: Callable):
    @wraps(func)
    async def wrapper(request: Request, *args, **kwargs):
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
            if request.url.path.startswith("/admin") and user.get("is_admin", False):
                return Response(
                    {"status": False, "message": "Only admin can access this path"},
                    status_code=403,
                )
        try:
            response: Response = await func(request=request, *args, **kwargs)
            response.headers["is_admin"] = "no"
            if user:
                response.headers["is_admin"] = "yes" if user.get("is_admin") else "no"
                response.headers["image"] = user.get("image")
                response.headers["name"] = user.get("name")
            return response
        except Exception as e:
            print(e)
            return Response(
                {"status": False, "message": "Oops! Something went wrong"},
                status_code=500,
            )

    return wrapper
