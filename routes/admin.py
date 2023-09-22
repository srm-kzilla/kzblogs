from fastapi import Request, Response, APIRouter as Router
from json import dumps
from database import MongoDBConnection as Database
from helpers.schemas import Blog


router = Router()
db = Database()


@router.get("/{id}")
async def get_blog(request: Request, id: str = "all", show_all: bool = True):
    if id == "all":
        id = None
    result = db.blogs.get_blog(id, show_all)
    return Response(content=dumps(result), media_type="application/json")


@router.post("/")
async def create_blog(request: Request, blog: Blog):
    result = db.blogs.create_blog(dict(blog))
    return Response(content=dumps(result), media_type="application/json")


@router.put("/{id}")
async def update_blog(request: Request, id: str, blog: Blog):
    result = db.blogs.update_blog(id, dict(blog))
    return Response(content=dumps(result), media_type="application/json")


@router.delete("/{id}")
async def delete_blog(request: Request, id: str):
    result = db.blogs.delete_blog(id)
    return Response(content=dumps(result), media_type="application/json")
