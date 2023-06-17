from fastapi import Response, Request, APIRouter as Router
from json import dumps
from db import database

router = Router()
db = database.MongoDbConnection()

@router.get("/all")
async def getAll(req: Request) -> Response:
    return Response(
        dumps({"status": False, "message": "Not implemented yet."}),
        500,
    )
