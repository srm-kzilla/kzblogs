from fastapi import Response, Request, APIRouter as Router
from json import dumps

from helpers.schema import AddBlogSchema, UpdateBlogSchema, UpdateStatusSchema

router = Router()


@router.post("/add/blog")
async def add_blog(req: Request, data: AddBlogSchema) -> Response:
    try:
        output: str = req.db.add_blog(data)
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
        output: dict = req.db.delete_blog(id)
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
        output: dict = req.db.update_blog(str(data.id), data.dict())
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
async def get_all(
    req: Request, showall: bool = True, page: int = 0, count: int = 0
) -> Response:
    try:
        results: list = req.db.get_blogs(None, show_all=showall)
        count = count if count else len(results)
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


@router.post("/update-status/{id}")
async def update_status(
    req: Request, id: str, blog_publish_status: UpdateStatusSchema
) -> Response:
    try:
        blog = req.db.get_blog_by_id(str(id))
        blog["blog_publish_status"] = blog_publish_status
        output: dict = req.db.update_blog(blog["id"], blog)
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
