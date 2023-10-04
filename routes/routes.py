from fastapi import Response, Request, APIRouter as Router
from database import MongoDBConnection as Database
from helpers.schemas import Comment, Like, Bookmark
from helpers.response import Response

router = Router()
db = Database()


@router.post("/likes/{blog_id}")
async def add_like(request: Request, blog_id: str):
    user = await db.users.verify_session(request.headers["x-session-id"])
    if not user:
        return Response({"status": False, "message": "User not found"}, status_code=403)
    return Response(await db.blogs.add_like(id=blog_id, user_id=user["_id"]))


@router.delete("/likes/{blog_id}")
async def remove_like(request: Request, blog_id: str):
    user_id = str(
        (await db.users.verify_session(request.headers["x-session-id"]))["_id"]
    )
    return Response(await db.blogs.remove_like(id=blog_id, user_id=user_id))


@router.get("/comments/{blog_id}")
async def get_comments(request: Request, blog_id: str):
    return Response(await db.blogs.get_comments(blog_id))


@router.post("/comments")
async def add_comment(request: Request, comment_data: Comment):
    comment = dict(comment_data)
    comment["author_id"] = (
        await db.users.verify_session(request.headers["x-session-id"])
    )["_id"]
    return Response(await db.blogs.add_comment(comment_data))


@router.delete("/comments/{comment_id}")
async def delete_comment(request: Request, comment_id: str):
    user = await db.users.verify_session(request.headers["x-session-id"])
    return Response(await db.blogs.delete_comment(comment_id, str(user["_id"])))


@router.post("/bookmarks")
async def add_bookmark(request: Request, bookmark_data: Bookmark):
    user = await db.users.verify_session(request.headers["x-session-id"])
    return Response(
        await db.users.add_bookmark(
            user_id=str(user["_id"]), blog_id=bookmark_data.blog_id
        )
    )


@router.delete("/bookmarks/{blog_id}")
async def remove_bookmark(request: Request, blog_id: str):
    user = await db.users.verify_session(request.headers["x-session-id"])
    return Response(
        await db.users.remove_bookmark(user_id=str(user["_id"]), blog_id=blog_id)
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


@router.get("/blogs/{blog_id}")
async def get_blogs(request: Request, blog_id: str = "all"):
    blog_id = None if blog_id == "all" else blog_id
    return Response(await db.blogs.get_blog(blog_id, show_all=False))
