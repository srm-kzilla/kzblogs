from fastapi import Request, Response, APIRouter as Router
from json import dumps
from database import MongoDBConnection as Database


router = Router()
db = Database()

@router.get("/{id}")
async def get_blog(request: Request, id: str = "all", show_all: bool = True):
    if id == "all": id = None
    result = db.blogs.get_blog(id, show_all)
    return Response(content=dumps(result), media_type="application/json")

@router.delete("/{id}")
async def delete_blog(request: Request, id: str):
    result = db.blogs.delete_blog(id)
    return Response(content=dumps(result), media_type="application/json")
