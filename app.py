"""Intialize Entry point of api's."""

import json

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


@app.get("/admin/add/blog/{query}")
async def add_blogs(request: Request, author:str,title:str, blog:str):
    """Endpoint for adding new blogs."""

    try:
        data = mongodb_con.add_blogs(author, title, blog)

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
