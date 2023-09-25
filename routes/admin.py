from fastapi import Request, APIRouter as Router
from database import MongoDBConnection as Database

from helpers.schema import Blog
from helpers.response import Response

router = Router()
db = Database()


@router.get("/{id}")
async def get_admin(request: Request, id: str = "all"):
    id = None if id == "all" else id
    result = db.blogs.get_blog(blog_id=id)
    if isinstance(result, dict) and "status" not in result:
        result["_id"] = str(result["_id"])
    elif isinstance(result, list):
        for i in range(len(result)):
            result[i]["_id"] = str(result[i]["_id"])
    return Response(
        result, status_code=404 if "status" in result and not result["status"] else 200
    )


@router.post("/")
async def add_blog(request: Request, blog: Blog):
    result = db.blogs.create_blog(dict(blog))
    return Response(result)


@router.put("/{id}")
async def update_blog(request: Request, blog: Blog, id: str):
    result: dict = db.blogs.update_blog(id, dict(blog))
    return Response(result, status_code=404 if not result["status"] else 200)


@router.delete("/{id}")
async def delete_blog(request: Request, id: str):
    result: dict = db.blogs.delete_blog(id)
    return Response(result, status_code=404 if not result["status"] else 200)
