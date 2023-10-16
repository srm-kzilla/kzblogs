from fastapi import Request
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
            return await func(*args, **kwargs)
        except Exception as e:
            print(e)
            return Response(
                {"status": False, "message": "Oops! Something went wrong"},
                status_code=500,
            )
    return wrapper