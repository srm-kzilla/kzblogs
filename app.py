"""Intialize Entry point of api's."""

import datetime
import json
import time
import uuid

from bson import json_util
from fastapi import FastAPI, Request, Response
from slugify import slugify

from db.database import MongoDbConnection
from helpers.schema import BlogSchema

app = FastAPI()

# Initialize mongodb connection
mongodb_con = MongoDbConnection()


@app.get("/blog/{query}")
async def get_all_blogs(request: Request, query: str = "all"):
    """Endpoint for fetching all blogs."""

    try:
        data = mongodb_con.get_blogs(query)

        return Response(
            json.dumps({"status": True, "data": data}, default=json_util.default),
            200,
            {"Content-Type": "application/json"},
        )

    except Exception as e:
        return Response(
            json.dumps({"status": False, "message": str(e)}),
            500,
            {"Content-Type": "application/json"},
        )


@app.post("/admin/add/blog/")
async def add_blogs(request: BlogSchema):
    """Endpoint for adding new Blogs."""

    try:

        data = dict(request)

        data["likes_count"] = 0
        data["slug"] = slugify(data.get("blog_title"))
        data["date_published"] = time.mktime(datetime.datetime.today().timetuple())
        data["date_modified"] = time.mktime(datetime.datetime.today().timetuple())
        data["uuid"] = str(uuid.uuid4())

        mongodb_con.add_blog(data)

        return Response(
            json.dumps(
                {
                    "status": True,
                    "message": f"Successful added a blog slug {data.get('slug')}",
                },
                default=json_util.default,
            ),
            200,
            {"Content-Type": "application/json"},
        )

    except Exception as e:
        return Response(
            json.dumps({"status": False, "message": str(e)}),
            500,
            {"Content-Type": "application/json"},
        )


@app.get("/health")
async def healthcheck(request: Request) -> Response:
    """Check whether kz-blogs is running."""

    return Response("OK", 200)


@app.get("/")
async def root(request: Request) -> Response:
    """Root."""

    return Response("KZBLOGS API V1.0", 200)


# ,"date_published":date_published,, "uuid": uid
