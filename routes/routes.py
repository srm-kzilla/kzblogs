from fastapi import Response, Request, APIRouter as Router
from database import MongoDBConnection as Database
from helpers.schemas import Comment, Bookmark
from helpers.response import Response

router = Router()
db = Database()


@router.post("/likes/{blog_id}")
async def add_like(request: Request, blog_id: str):
    user = await db.users.verify_session(request.headers["x-session-id"])
    response = await db.blogs.like(blog_id=blog_id, user_id=str(user["_id"]))
    return Response(response, status_code=200 if response["status"] else 400)


@router.get("/comments/{blog_id}")
async def get_comments(request: Request, blog_id: str):
    response = await db.blogs.get_comments(blog_id)
    return Response(response, status_code=200 if response else 404)


@router.post("/comments")
async def add_comment(request: Request, comment_data: Comment):
    comment = dict(comment_data)
    comment["author_id"] = str(
        (await db.users.verify_session(request.headers["x-session-id"]))["_id"]
    )
    return Response(await db.blogs.add_comment(comment))


@router.delete("/comments/{comment_id}")
async def delete_comment(request: Request, comment_id: str):
    user = await db.users.verify_session(request.headers["x-session-id"])
    response = await db.blogs.delete_comment(comment_id, str(user["_id"]))
    return Response(response, status_code=200 if response["status"] else 400)


@router.post("/bookmarks/{blog_id}")
async def bookmark(request: Request, blog_id: str):
    user = await db.users.verify_session(request.headers["x-session-id"])
    response = await db.users.bookmark(str(user["_id"]), blog_id)
    return Response(response, status_code=200 if response["status"] else 400)


@router.get("/bookmarks/")
async def get_bookmarks(request: Request):
    bookmarks = await db.users.get_bookmarks(
        (await db.users.verify_session(request.headers["x-session-id"]))["_id"]
    )
    return Response(bookmarks)


@router.get("/trending")
async def get_trending(request: Request, count: int = 5):
    return Response(await db.blogs.get_trending())


@router.get("/blogs/{blog_id}")
async def get_blogs(request: Request, blog_id: str = "all"):
    blog_id = None if blog_id == "all" else blog_id
    return Response(await db.blogs.get_blog(blog_id, show_all=False))
