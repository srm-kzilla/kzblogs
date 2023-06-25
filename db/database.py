
import logging
from typing import Final, Union
from time import time
from bson import ObjectId
from slugify import slugify


from pymongo import MongoClient, database
from pymongo.database import Database

from helpers.constants import CONST_DB_SETTINGS
from helpers.schema import BlogSchema, UpdateBlogSchema,AddUserSchema

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

    def add_user(self, data: AddUserSchema):
        try:
            data=dict(data)
            db=self.db.get_collection("users")
            result=db.find_one({"email": ObjectId(data)})
            if result:
                return{
                    "message": "User already exist.",
                    "status": False,
                }
            result = dict(result)
            print(result)
            result["email"] = str(result.pop("email"))
            return result
        
        except Exception as e:
            raise Exception(e)

    def login(self, query: str, data: AddUserSchema) -> dict:
         try:
            db = self.db.get_collection("users")
            result = db.find_one({"email": ObjectId(query)})
            if not result:
                return {
                    "message": "Invalid User.",
                    "status": False,
                }
            password=db.find_one({"password":ObjectId(query)})
            if not password:
                return{
                    "message":"Invalid Password.",
                    "status":False,
                }
            result = dict(result)
            print(result)
            result["email"] = str(result.pop("email"))
            return result
         except Exception as e:
            raise Exception(e)

    def get_blogs(self, query: Union[str, None] = None, show_all: bool = False, **kwargs):
        db = self.db.get_collection("blogs")
        try:
            filter: dict = {"slug": query, "blog_publish_status": True}
            filter.update(kwargs)
            if show_all:
                del filter["blog_publish_status"]
            if not query:
                del filter["slug"]
                result: list = list(db.find(filter))
                for i in range(len(result)):
                    result[i]["id"] = str(result[i].pop("_id"))
                return result

            result = db.find_one(filter)
            if not result:
                result = {
                    "message": "The blog is not present in the database.",
                    "status": False,
                }
            result = dict(result)
            result["id"] = str(result.pop("_id"))
            return result

        except Exception as e:
            raise Exception(e)

    def get_blog_by_id(self, query: str) -> dict:
        try:
            db = self.db.get_collection("blogs")
            result = db.find_one({"_id": ObjectId(query)})
            if not result:
                return {
                    "message": "The blog is not present in the database.",
                    "status": False,
                }
            result = dict(result)
            print(result)
            result["id"] = str(result.pop("_id"))
            return result

        except Exception as e:
            raise Exception(e)

    def add_blog(self, data: BlogSchema):
        try:
            data = dict(data)
            data["date_published"] = int(time()) if data["blog_publish_status"] else 0
            data["date_modified"] = int(time())
            data["readtime_min"], data["likes_count"] = 0, 0
            data["slug"] = slugify(data["blog_title"])
            db = self.db.get_collection("blogs")
            return str(db.insert_one(data).inserted_id)

        except Exception as e:
            raise Exception(e)
        
    

    def update_blog(self, query: str, data: UpdateBlogSchema) -> dict:
        try:
            db = self.db.get_collection("blogs")
            if db.count_documents({"_id": ObjectId(query)}, limit=1) != 0:
                existing_data = dict(db.find_one({"_id": ObjectId(query)}))
                data = dict(data)
                if "id" in data:
                    data.pop("id")
                data["slug"] = slugify(data["blog_title"])
                existing_data.update(data)
                db.update_one({"_id": query}, {"$set": data})
                return {"status": True, "message": "Blog updated successfully!"}
            else:
                return {
                    "message": "The blog is not present in the database.",
                    "status": False,
                }

        except Exception as e:
            raise Exception(e)

    def delete_blog(self, query: str) -> dict:
        try:
            db = self.db.get_collection("blogs")
            if db.count_documents({"_id": ObjectId(query)}, limit=1) != 0:
                db.delete_one({"_id": ObjectId(query)})
                return {"status": True, "message": "Blog deleted successfully!"}
            else:
                return {
                    "message": "The blog is not present in the database.",
                    "status": False,
                }

        except Exception as e:
            raise Exception(e)

    def __del__(self):
        """Delete this instance."""

        self.disconnect()

    def disconnect(self) -> None:
        """Stop the connection."""

        try:
            self.client.close()

        except Exception as e:
            raise e

