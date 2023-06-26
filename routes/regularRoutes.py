from fastapi import (
    Response,
    Request,
    APIRouter as Router,
    FastAPI,
    HTTPException,
    Depends,
)
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from json import dumps
from db.database import MongoDbConnection, database


router = Router()
SECRET_KEY = "your-secret-key"

bearer = HTTPBearer()
db = MongoDbConnection()


@router.get("/all")
async def get_all(req: Request) -> Response:
    try:
        results: list = db.get_blogs()
        return Response(dumps(results), status_code=200, media_type="application/json")
    except Exception as e:
        print(e)
        return Response(
            dumps({"status": False, "message": "Oops! something went wrong"}),
            status_code=500,
            media_type="application/json",
        )


@router.get("/article/{slug}")
async def get_article(req: Request, slug: str) -> Response:
    try:
        results: dict = db.get_blogs(slug)
        if "message" not in results:
            return Response(
                dumps(results), status_code=200, media_type="application/json"
            )
        else:
            return Response(
                dumps(results), status_code=404, media_type="application/json"
            )
    except Exception as e:
        print(e)
        return Response(
            dumps({"status": False, "message": "Oops! something went wrong"}),
            status_code=500,
            media_type="application/json",
        )


@router.post("/like/{slug}")
async def like_article(req: Request, slug: str) -> Response:
    try:
        results: dict = db.get_blogs(slug)
        results["likes_count"] += 1
        output = db.update_blog(results["id"], results)
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
