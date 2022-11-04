"""Intialize Entry point of api's."""

import datetime
from slugify import slugify
import uuid
import json
from helpers.schema import ABC
from bson import json_util
from fastapi import FastAPI, Request, Response

from db.database import MongoDbConnection

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


@app.get("/health")
async def healthcheck(request: Request) -> Response:
    """Check whether kz-blogs is running."""

    return Response("OK", 200)


@app.get("/")
async def root(request: Request) -> Response:
    """Root."""

    return Response("KZBLOGS API V1.0", 200)


@app.post("/admin/add/blog/")
async def add_blogs(request: ABC):
        # """Endpoint for adding new Blogs."""

    blog_title = request.blog_title
    blog_body = request.blog_body
    blog_entry_image = request.blog_entry_image
    author = request.author
    date_published= datetime.datetime.today()
    date_modified = datetime.datetime.today()
    readtime_min = request.readtime_min
    likes_count = 0
    category = request.category
    slug = slugify(blog_title)
    blog_publish_status = True
    uid= uuid.uuid1()

    data = {"blog_title":blog_title,"blog_body":blog_body,"blog_entry_image":blog_entry_image, "author": author,"date_published":date_published,"date_modified":date_modified,"readtime_min": readtime_min,"likes_count": 0,"slug": slug, "category":category, "blog_publish_status":blog_publish_status, "uuid": uid}
    mongodb_con.add_blog(data)
    return {'message': f'Successfully Added Slug: {slug}', "status":True}


# ,"date_published":date_published,, "uuid": uid
