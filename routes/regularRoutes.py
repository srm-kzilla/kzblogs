from fastapi import Response, Request, APIRouter as Router
from json import dumps
from db import database

router = Router()
db = database.MongoDbConnection()


@router.get("/all")
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


@router.get("/article/{slug}")
async def get_article(req: Request, slug: str) -> Response:
    try:
        results: dict = db.get_blogs(slug)
        return Response(dumps(results), status_code=200, media_type="application/json")
    except Exception as e:
        return Response(
            dumps({"status": False, "message": str(e)}),
            status_code=500,
            media_type="application/json",
        )


@router.post("/like/{slug}")
async def like_article(req: Request, slug: str) -> Response:
    try:
        results: dict = db.get_blogs(slug)
        results["likes_count"] += 1
        db.update_blog(slug, results)
        return Response(dumps(results), status_code=200, media_type="application/json")
    except Exception as e:
        return Response(
            dumps({"status": False, "message": str(e)}),
            status_code=500,
            media_type="application/json",
        )
