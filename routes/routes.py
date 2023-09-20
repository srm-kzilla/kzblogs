from fastapi import APIRouter, Request, Response
from typing import Union
from json import dumps
from database import Database

router = APIRouter()
database = Database()


@router.get("/{id}")
async def get_blog(request: Request, id: str, page: int = 0, count: int = 0):
    result: Union[dict, list] = database.blogs.get_blog(id)
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
