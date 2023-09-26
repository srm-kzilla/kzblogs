from fastapi import Response, Request, APIRouter as Router
from database import MongoDBConnection as database
from helpers.schemas import Comment, Like, Bookmark
from helpers.response import Response

router = Router()
db = database()


@router.post("/likes/{id}")
async def add_like(request: Request, id: str, like: Like):
    return Response(db.blogs.add_like(id=id, user_id=like.user_id))


@router.post("/comments")
async def add_comment(request: Request, comment_data: Comment):
    return Response(db.blogs.add_comment(comment_data))


@router.post("/bookmarks")
async def add_bookmark(request: Request, id: str, bookmark: Bookmark):
    return Response(db.users.add_bookmark(blog_id=id, user_id=bookmark.user_id))


@router.get("/bookmarks/{id}")
async def get_bookmarks(request: Request, id: str, page: int = 0, count: int = 0):
    bookmarks = db.users.get_bookmarks(id)
    return Response(bookmarks)


@router.get("/trending")
async def get_trending(request: Request, count: int = 5):
    return Response(db.blogs.get_trending())
