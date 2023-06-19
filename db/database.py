import logging
import os
from typing import Final
from time import time
from slugify import slugify

from pymongo import MongoClient, database
from pymongo.database import Database

from helpers.constants import CONST_DB_SETTINGS
from helpers.schema import BlogSchema, UpdateBlogSchema

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

    def get_blogs(self, query: str, show_all: bool = False):
        db = self.db.get_collection("blogs")
        try:
            check: dict = {"slug": query, "blog_publish_status": True}
            if show_all:
                del check["blog_publish_status"]
            if query == "all":
                del check["slug"]
                result: list = list(db.find(check))
                [i.pop("_id") for i in result]  # Removing All MongoDB IDs
                return result

            result = db.find_one(check)
            if not result:
                raise Exception("No data found!")
            result = dict(result)
            result.pop("_id")
            return result

        except Exception as e:
            raise Exception(str(e))

    def add_blog(self, data: BlogSchema):
        try:
            data = dict(data)
            data["date_published"] = int(time()) if data["blog_publish_status"] else 0
            data["date_modified"] = int(time())
            data["readtime_min"], data["likes_count"] = 0, 0
            data["slug"] = slugify(data["blog_title"])
            db = self.db.get_collection("blogs")
            db.insert_one(data)

        except Exception as e:
            raise Exception(str(e))

    def update_blog(self, query: str, data: UpdateBlogSchema):
        try:
            db = self.db.get_collection("blogs")
            if db.count_documents({"slug": query}, limit=1) != 0:
                existing_data = dict(db.find_one({"slug": query}))
                data = dict(data)
                data.pop("required_slug")
                data["slug"] = slugify(data["blog_title"])
                existing_data.update(data)
                db.update_one({"slug": query}, {"$set": data})
            else:
                raise Exception("The blog is not present in the database.")

        except Exception as e:
            raise Exception(str(e))

    def delete_blog(self, query: str):
        try:
            db = self.db.get_collection("blogs")
            if db.count_documents({"slug": query}, limit=1) != 0:
                db.delete_one({"slug": query})
            else:
                raise Exception("The blog is not present in the database.")

        except Exception as e:
            raise Exception(str(e))

    def __del__(self):
        """Delete this instance."""

        self.disconnect()

    def disconnect(self) -> None:
        """Stop the connection."""

        try:
            self.client.close()

        except Exception as e:
            raise e
