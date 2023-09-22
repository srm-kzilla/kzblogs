from fastapi import Response, Request, APIRouter as Router
from json import dumps
from database import MongoDBConnection as database
from routes import admin
from helpers.schemas import Blog, User, Comment

router = Router()
db = database()

@router.post("/likes")
async def add_like(id: str, request: Request):
    data = await request.json()
    blog = db.blogs.get_blog(id)
    if isinstance(blog, dict):
        likes = db.blogs.add_like(blog["_id"])
        blog[id]["likes"] += 1
    return Response(dumps(db.blogs.add_like(data)), media_type="application/json")

@router.post("/comments")
async def add_comment(id: str, request: Request,comment_data: Comment):
    data = await request.json()
    blog=db.blogs.get_blog(id)
    if isinstance(blog, dict):
        comments =Comment.comment
        blog[id]["comments"].append(comments)
    return Response(dumps(db.blogs.add_comment(data)), media_type="application/json")

@router.get("/likes/{id}")
async def get_likes(id: str, request: Request, page: int = 0, count: int = 0):
    id = None if id == "all" else id
    likes = db.blogs.get_likes(id)
    return Response(dumps(likes), media_type="application/json")

@router.get("/comments/{id}")
async def get_comments(id: str, request: Request, page: int = 0, count: int = 0):
    id = None if id == "all" else id
    comments = db.blogs.get_comments(id)
    return Response(dumps(comments), media_type="application/json")

@router.post("/bookmarks")
async def add_bookmark(id: str, request: Request):
    data = await request.json()
    blog = db.blogs.get_blog(id)
    if isinstance(blog, dict):
        bookmarks = db.blogs.add_bookmark(blog["_id"])
        blog[id]["bookmarks"] += 1
    return Response(dumps(db.blogs.add_bookmark(data)), media_type="application/json")

@router.get("/bookmarks/{id}")
async def get_bookmarks(id: str, request: Request, page: int = 0, count: int = 0):
    id = None if id == "all" else id
    bookmarks = db.blogs.get_bookmarks(id)
    return Response(dumps(bookmarks), media_type="application/json")

