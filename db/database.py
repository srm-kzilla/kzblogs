import logging
from typing import Callable, Final

from fastapi import Request, Response
from fastapi.routing import APIRoute

from pymongo import MongoClient, database

from helpers.constants import CONST_DB_SETTINGS
from db import blogs, users

logger = logging.getLogger(__name__)


CONST_MONGODB_URI: Final = CONST_DB_SETTINGS.get("MONGO_DB_URI")
if CONST_MONGODB_URI is None:
    print("[ERROR] Please specifiy mongodb url")
    exit(1)


class MongoDbConnection:
    def __init__(self):
        self.client = MongoClient(CONST_MONGODB_URI)
        self.db = database.Database(self.client, "kzblogs")
        self.blogs = blogs.BlogDB(self.client)
        self.users = users.UserDB(self.client)

    def __del__(self):
        self.disconnect()

    def disconnect(self):
        self.client.close()


class CustomRequest(Request):
    def __init__(self, db: MongoDbConnection, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.db = db


class CustomRouter(APIRoute):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.db = MongoDbConnection()

    def get_route_handler(self) -> Callable:
        original_route_handler = super().get_route_handler()

        async def custom_route_handler(request: Request) -> Response:
            request = CustomRequest(self.db, request.scope, request.receive)
            return await original_route_handler(request)

        return custom_route_handler
