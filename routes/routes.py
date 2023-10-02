from fastapi import Response, Request, APIRouter as Router
from database import MongoDBConnection as Database
from helpers.schemas import Comment, Like, Bookmark
from helpers.response import Response

router = Router()
db = Database()


@router.post("/likes/{blog_id}")
async def add_like(request: Request, blog_id: str, like: Like):
    if (
        str((await db.users.verify_session(request.headers["x-session-id"]))["_id"])
        != like.user_id
    ):
        return Response(
            {"status": False, "message": "User ID mismatch"}, status_code=403
        )
    return Response(await db.blogs.add_like(id=blog_id, user_id=like.user_id))


@router.post("/comments")
async def add_comment(request: Request, comment_data: Comment):
    if (
        str((await db.users.verify_session(request.headers["x-session-id"]))["_id"])
        != comment_data.author_id
    ):
        return Response(
            {"status": False, "message": "User ID mismatch"}, status_code=403
        )
    return Response(await db.blogs.add_comment(dict(comment_data)))


@router.post("/bookmarks/{blog_id}")
async def add_bookmark(request: Request, blog_id: str, bookmark: Bookmark):
    if (
        str((await db.users.verify_session(request.headers["x-session-id"]))["_id"])
        != bookmark.user_id
    ):
        return Response(
            {"status": False, "message": "User ID mismatch"}, status_code=403
        )
    return Response(
        await db.users.add_bookmark(user_id=bookmark.user_id, blog_id=blog_id)
    )


@router.get("/bookmarks/")
async def get_bookmarks(request: Request):
    bookmarks = await db.users.get_bookmarks(
        (await db.users.verify_session(request.headers["x-session-id"]))["_id"]
    )
    return Response(bookmarks)


@router.get("/trending")
async def get_trending(request: Request, count: int = 5):
    return Response(await db.blogs.get_trending())


@router.get("/all")
async def get_all(request: Request):
    return Response(await db.blogs.get_blog(show_all=False))
