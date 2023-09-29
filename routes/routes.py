from fastapi import Response, Request, APIRouter as Router
from database import MongoDBConnection as Database
from helpers.schemas import Comment, Like, Bookmark
from helpers.response import Response

router = Router()
db = Database()


@router.post("/likes/{id}")
async def add_like(request: Request, id: str, like: Like):
    return Response(await db.blogs.add_like(id=id, user_id=like.user_id))


@router.post("/comments")
async def add_comment(request: Request, comment_data: Comment):
    return Response(await db.blogs.add_comment(comment_data))


@router.post("/bookmarks")
async def add_bookmark(request: Request, id: str, bookmark: Bookmark):
    return Response(await db.users.add_bookmark(blog_id=id, user_id=bookmark.user_id))


@router.get("/bookmarks/{id}")
async def get_bookmarks(id: str, request: Request):
    bookmarks = await db.users.get_bookmarks(id)
    return Response(bookmarks)


@router.get("/trending")
async def get_trending(request: Request, count: int = 5):
    return Response(await db.blogs.get_trending())
