from fastapi import (
    Response,
    Request,
    APIRouter as Router,
)
from fastapi.security import HTTPBearer
from security import jwtHandler
from json import dumps
from db.database import MongoDbConnection

router = Router()
bearer = HTTPBearer()
db = MongoDbConnection()


@router.get("/all")
async def get_all(req: Request, page: int = 0, count: int = 0) -> Response:
    try:
        results: list = db.get_blogs()
        count = count if count else len(results)
        if not count:
            return Response(
                dumps({"status": False, "message": "No blogs found"}),
                status_code=404,
                media_type="application/json",
            )
        output: dict = {
            "page": page,
            "count": count,
            "total": len(results),
            "total_pages": len(results) // count,
            "results": results[page * count : (page + 1) * count]
            if len(results)
            else [],
        }
        return Response(dumps(output), status_code=200, media_type="application/json")
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
        if "message" not in results and results["blog_publish_status"]:
            return Response(
                dumps(results), status_code=200, media_type="application/json"
            )
        else:
            return Response(
                dumps(results), status_code=404, media_type="application/json"
            )
    except Exception as e:
        return Response(
            dumps({"status": False, "message": "Oops! something went wrong"}),
            status_code=500,
            media_type="application/json",
        )


@router.post("/like/{slug}")
async def like_article(req: Request, slug: str) -> Response:
    try:
        results: dict = db.get_blogs(slug)
        if "message" in results:
            return Response(
                dumps(results), status_code=400, media_type="application/json"
            )
        user_token: str = req.headers.get("authorization", {})
        user_id: str = jwtHandler.decodeJWT(user_token).get("user_id")
        results["likes"].append(user_id) if user_id not in results[
            "likes"
        ] else results["likes"].remove(user_id)
        output: dict = db.update_blog(results["id"], results)
        return Response(
            dumps(output),
            status_code=200 if output["status"] else 404,
            media_type="application/json",
        )
    except Exception as e:
        raise e
        return Response(
            dumps({"status": False, "message": "Oops! something went wrong"}),
            status_code=500,
            media_type="application/json",
        )
