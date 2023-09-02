from fastapi import APIRouter as Router, Response, Request
from db import database
from json import dumps
from security import bcryptHandler, jwtHandler

from helpers.schema import AddUserSchema, UpdateUserSchema, UserSchema

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
async def login(data: UserSchema) -> Response:
    try:
        output: dict = db.login(data)
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


@router.get("/details/{id}")
async def details(req: Request, id: str):
    try:
        if not req.headers.get("authorization"):
            return Response(
                dumps({"status": False, "message": "Missing Authorization header"}),
                status_code=403,
            )
        jwtData: dict = jwtHandler.decodeJWT(
            req.headers.get("authorization", "").encode("utf-8")
        )
        if jwtData["id"] != id:
            return Response(
                dumps({"status": False, "message": "Unauthorized"}),
                status_code=403,
            )

        output: dict = db.get_user(id)
        output.pop("password", None)
        return Response(
            dumps(output),
            status_code=200 if output.get("status", True) else 404,
            media_type="application/json",
        )
    except Exception as e:
        print(e)
        return Response(
            dumps({"status": False, "message": "Oops! something went wrong"}),
            status_code=500,
            media_type="application/json",
        )


@router.put("/update")
async def update(req: Request, data: UpdateUserSchema):
    try:
        output: dict = db.get_user(data.id)
        if "message" in output:
            return Response(
                dumps(output),
                status_code=404,
                media_type="application/json",
            )
        output = db.update_user(data.id, data)
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
