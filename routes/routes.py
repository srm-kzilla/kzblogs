from fastapi import Response, Request, APIRouter as Router
from database import MongoDBConnection as Database
from helpers.schemas import Comment
from helpers.response import Response

router = Router()
db = Database()


@router.post("/likes/{id}")
async def add_like(request: Request, id: str):
    if not request.session_user.get("_id"):
        return Response(
            {"status": False, "message": "User not logged in"}, status_code=403
        )
    return Response(await db.blogs.add_like(id=id, user_id=request.session_user["_id"]))


@router.post("/comments")
async def add_comment(request: Request, comment_data: Comment):
    if not request.session_user.get("_id"):
        return Response(
            {"status": False, "message": "User not logged in"}, status_code=403
        )
    if request.session_user["_id"] != comment_data.author_id:
        return Response(
            {"status": False, "message": "You are not authorized to add this comment"},
            status_code=403,
        )
    return Response(await db.blogs.add_comment(comment_data))


@router.post("/bookmarks/{blog_id}")
async def add_bookmark(request: Request, blog_id: str):
    if not request.session_user.get("_id"):
        return Response(
            {"status": False, "message": "User not logged in"}, status_code=403
        )
    return Response(
        await db.users.add_bookmark(
            blog_id=blog_id, user_id=request.session_user["_id"]
        )
    )


@router.get("/bookmarks/")
async def get_bookmarks(request: Request):
    if not request.session_user.get("_id"):
        return Response(
            {"status": False, "message": "User not logged in"}, status_code=403
        )
    bookmarks = await db.users.get_bookmarks(id)
    return Response(bookmarks)


@router.get("/trending")
async def get_trending(request: Request, count: int = 5):
    return Response(await db.blogs.get_trending())
