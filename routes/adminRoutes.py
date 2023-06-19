from fastapi import Response, Request, APIRouter as Router
from json import dumps
from db import database

from helpers.schema import AddBlogSchema, UpdateBlogSchema

router = Router()
db = database.MongoDbConnection()


@router.post("/add/blog")
async def add_blog(req: Request, data: AddBlogSchema) -> Response:
    try:
        output: str = db.add_blog(data)
        return Response(
            dumps(
                {"status": True, "message": "Blog added successfully!", "id": output}
            ),
            status_code=200,
            media_type="application/json",
        )
    except Exception as e:
        print(e)
        return Response(
            dumps({"status": False, "message": "Oops! something went wrong"}),
            status_code=500,
            media_type="application/json",
        )


@router.delete("/delete/blog/{id}")
async def delete_blog(req: Request, id: str) -> Response:
    try:
        output = db.delete_blog(id)
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


@router.put("/update/blog")
async def update_blog(req: Request, data: UpdateBlogSchema) -> Response:
    try:
        output = db.update_blog(str(data.id), data.dict())
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


@router.get("/blog/all")
async def get_all(req: Request) -> Response:
    try:
        results: list = db.get_blogs(None, show_all=True)
        return Response(dumps(results), status_code=200, media_type="application/json")
    except Exception as e:
        print(e)
        return Response(
            dumps({"status": False, "message": "Oops! something went wrong"}),
            status_code=500,
            media_type="application/json",
        )


@router.post("/update-status/{id}")
async def update_status(req: Request, id: str) -> Response:
    try:
        blog = db.get_blog_by_id(str(id))
        blog["blog_publish_status"] = not blog["blog_publish_status"]
        output: dict = db.update_blog(blog["id"], blog)
        output["publish_status"] = blog["blog_publish_status"]
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
