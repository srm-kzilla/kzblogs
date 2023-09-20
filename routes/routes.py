from fastapi import APIRouter, Request, Response
from typing import Union
from json import dumps
from database import MongoDBConnection as Database

router = APIRouter()
database = Database()


@router.get("/{id}")
async def get_blog(
    request: Request, id: Union[str, None] = None, page: int = 0, count: int = 0
):
    if id == "all":
        id = None
    result: Union[dict, list] = database.blogs.get_blog(id)
    print(result)
    if isinstance(result, dict):
        result["id"] = result.pop("_id")
        result["likes"] = len(result["likes"])
        result["comments"] = len(result["comments"])
        return Response(dumps(result), media_type="application/json")
    for blog in result:
        blog["id"] = blog.pop("_id")
        blog["likes"] = len(blog["likes"])
        blog["comments"] = len(blog["comments"])
    return Response(dumps(result), media_type="application/json")
