from fastapi import APIRouter as Router, Response, Request
from db import database
from json import dumps

from helpers.schema import AddUserSchema

router = Router()
db = database.MongoDbConnection()


@router.post("/add")
async def add_user(req: Request, data: AddUserSchema) -> Response:
    try:
        output: dict = db.add_user(data)
        return Response(
            dumps(output),
            status_code=200 if output["status"] else 404,
            media_type="application/json",
        )
    except Exception as e:
        print(e)
        return Response(
            dumps({"status": False, "message": "Oops! something went wrong"}),
            status_code=500,
            media_type="application/json",
        )


@router.post("/login")
async def login(data: AddUserSchema) -> Response:
    try:
        output: dict = db.login(data.email, data.password)
        return Response(
            dumps(output),
            status_code=200 if output["status"] else 404,
            media_type="application/json",
        )
    except Exception as e:
        print(e)
        return Response(
            dumps({"status": False, "message": "Oops! something went wrong"}),
            status_code=500,
            media_type="application/json",
        )
