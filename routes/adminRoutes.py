from fastapi import Response, Request, APIRouter as Router
from json import dumps
from db import database

from helpers.schema import BlogSchema, UpdateBlogSchema

router = Router()
db = database.MongoDbConnection()


@router.post("/add/blog")
async def add_blog(req: Request, data: BlogSchema) -> Response:
    try:
        db.add_blog(data)
        return Response(
            dumps({"status": True, "message": "Blog added successfully!"}),
            status_code=200,
            media_type="application/json",
        )
    except Exception as e:
        return Response(
            dumps({"status": False, "message": str(e)}),
            status_code=500,
            media_type="application/json",
        )


@router.delete("/delete/blog/{slug}")
async def delete_blog(req: Request, slug: str) -> Response:
    try:
        db.delete_blog(slug)
        return Response(
            dumps({"status": True, "message": "Blog deleted successfully!"}),
            status_code=200,
            media_type="application/json",
        )
    except Exception as e:
        return Response(
            dumps({"status": False, "message": str(e)}),
            status_code=500,
            media_type="application/json",
        )


@router.put("/update/blog")
async def update_blog(req: Request, data: UpdateBlogSchema) -> Response:
    try:
        db.update_blog(data["slug"], data["data"])
        return Response(
            dumps({"status": True, "message": "Blog updated successfully!"}),
            status_code=200,
            media_type="application/json",
        )
    except Exception as e:
        return Response(
            dumps({"status": False, "message": str(e)}),
            status_code=500,
            media_type="application/json",
        )


@router.get("/blog/all")
async def get_all(req: Request) -> Response:
    try:
        results: list = db.get_blogs("all")
        return Response(dumps(results), status_code=200, media_type="application/json")
    except Exception as e:
        return Response(
            dumps({"status": False, "message": str(e)}),
            status_code=500,
            media_type="application/json",
        )


@router.post("/update-status/{slug}")
async def update_status(req: Request, slug: str) -> Response:
    try:
        blog = db.get_blogs(slug)
        blog["blog_publishing_status"] = not blog["blog_publishing_status"]
        db.update_blog(slug, blog)
        return Response(
            dumps({"status": True, "message": "Blog updated successfully!"}),
            status_code=200,
            media_type="application/json",
        )
    except Exception as e:
        return Response(
            dumps({"status": False, "message": str(e)}),
            status_code=500,
            media_type="application/json",
        )
