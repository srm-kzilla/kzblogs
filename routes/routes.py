from fastapi import Response, Request, APIRouter as Router
from json import dumps
from database import MongoDBConnection as database

router = Router()
db = database()


@router.get("/{id}")
async def get_blog(id: str, request: Request, page: int = 0, count: int = 0):
    id = None if id == "all" else id
    blog = db.blogs.get_blog(id)
    if isinstance(blog, dict):
        comments = db.blogs.get_comments(blog["_id"])
        blog["comments"] = comments
    return Response(dumps(blog), media_type="application/json")
