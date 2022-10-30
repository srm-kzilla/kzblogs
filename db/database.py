import logging
import os
from typing import Final
import datetime
from pymongo import MongoClient, database
from pymongo.database import Database

from helpers.constants import CONST_DB_SETTINGS

logger = logging.getLogger(__name__)


CONST_MONGODB_URI: Final = CONST_DB_SETTINGS.get("MONGO_DB_URI")

if CONST_MONGODB_URI is None:
    print("[ERROR] Please specifiy mongodb url")


class MongoDbConnection:
    """Handle MongoDB connection settings."""

    def __init__(self):
        """Create the MongoDB connection."""

        self.uri = CONST_MONGODB_URI
        self.db: Database
        self.client: MongoClient

        self.client = MongoClient(self.uri)
        self.db = database.Database(self.client, "kzblogs")

        logger.info("MongoDB Connected!")

    def get_blogs(self, query: str):
        db = self.db.get_collection("blogs")
        try:

            if query == "all":
                return list(db.find({"blog_publish_status": True}))

            return dict(db.find_one({"slug": query, "blog_publish_status": True}))

        except Exception as e:
            raise {"status": False, "message": str(e)}

    def add_blogs(self, author: str,title: str, blog: str):
        new_blog = [{"author": author,
              "Blog": blog,
              "Title": title,
              "Date": datetime.datetime.utcnow()}]
        db = self.db.blogs.insert_one(new_blog)   

    def __del__(self):
        """Delete this instance."""

        self.disconnect()

    def disconnect(self) -> None:
        """Stop the connection."""

        try:
            self.client.close()

        except Exception as e:
            raise e
