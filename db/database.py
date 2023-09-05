import logging
from typing import Final

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
