from fastapi import Response, Request, APIRouter as Router
from json import dumps
from database import MongoDBConnection as database
from helpers.schemas import Comment, Like, Bookmark

router = Router()
db = database()


@router.post("/likes/{id}")
async def add_like(request: Request, id: str, like: Like):
    return Response(
        dumps(db.blogs.add_like(id=id, user_id=like.user_id)),
        media_type="application/json",
    )


@router.post("/comments")
async def add_comment(request: Request, comment_data: Comment):
    return Response(
        dumps(db.blogs.add_comment(comment_data)), media_type="application/json"
    )


@router.post("/bookmarks")
async def add_bookmark(request: Request, id: str, bookmark: Bookmark):
    return Response(
        dumps(db.users.add_bookmark(blog_id=id, user_id=bookmark.user_id)),
        media_type="application/json",
    )


@router.get("/bookmarks/{id}")
async def get_bookmarks(id: str, request: Request, page: int = 0, count: int = 0):
    bookmarks = db.users.get_bookmarks(id)
    return Response(dumps(bookmarks), media_type="application/json")
