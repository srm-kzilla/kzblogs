"""Intialize Entry point of api's."""

from fastapi import FastAPI, Response
import json

from db.database import MongoDbConnection

app = FastAPI()

# Initialize mongodb connection
mongodb_con = MongoDbConnection()


@app.route("/blog/all", methods=["GET"])
async def get_all_blogs(request):
    """Endpoint for fetching all blogs."""

    try:
        collection = mongodb_con.db.get_collection("blogs")
        data = list(collection.find())

        return Response(
            json.dumps({"status": True, "data": data}),
            200,
            {"Content-Type": "application/json"},
        )

    except Exception as e:
        return Response(
            json.dumps({"status": False, "message": str(e)}),
            500,
            {"Content-Type": "application/json"},
        )


@app.route("/health", methods=["GET"])
async def healthcheck(request) -> Response:
    """Check whether kz-blogs is running."""

    return Response("OK", 200)


@app.route("/", methods=["GET"])
async def root(request) -> Response:
    """Root."""

    return Response("KZBLOGS API V1.0", 200)
