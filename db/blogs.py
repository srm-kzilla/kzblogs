from pymongo.database import Database
from pymongo import MongoClient
from typing import Union
from bson import ObjectId
from slugify import slugify
from time import time
from helpers.schema import BlogSchema, UpdateBlogSchema


class BlogDB:
    def __init__(self, client: MongoClient):
        self.client = client
        self.db = Database(self.client, "kzblogs")
        self.blogs = self.db.get_collection("blogs")

    def get_blogs(
        self, query: Union[str, None] = None, show_all: bool = False, **kwargs
    ):
        filter: dict = {"slug": query, "blog_publish_status": True}
        filter.update(kwargs)
        if show_all:
            del filter["blog_publish_status"]
        if not query:
            del filter["slug"]
            result: list = list(self.blogs.find(filter))
            for i in range(len(result)):
                result[i]["id"] = str(result[i].pop("_id"))
            return result

        if result := self.blogs.find_one(filter):
            result = dict(result)
            result["id"] = str(result.pop("_id"))
            return result
        else:
            return {
                "message": "The blog is not present in the database",
                "status": False,
            }

    def get_blog_by_id(self, query: str) -> dict:
        result = self.blogs.find_one({"_id": ObjectId(query)})
        if not result:
            return {
                "message": "The blog is not present in the databae",
                "status": False,
            }
        result = dict(result)
        result["id"] = str(result.pop("_id"))
        return result

    def add_blog(self, data: BlogSchema):
        data = dict(data)
        data["date_published"] = int(time()) if data["blog_publish_status"] else 0
        data["date_modified"] = int(time())
        data["readtime_min"], data["likes"] = 0, []
        data["slug"] = slugify(data["blog_title"])
        return str(self.blogs.insert_one(data).inserted_id)

    def update_blog(self, query: str, data: UpdateBlogSchema) -> dict:
        if self.blogs.count_documents({"_id": ObjectId(query)}, limit=1) != 0:
            existing_data = dict(self.blogs.find_one({"_id": ObjectId(query)}))
            data = dict(data)
            if "id" in data:
                data.pop("id")
            data["slug"] = slugify(data["blog_title"])
            existing_data.update(data)
            self.blogs.update_one({"_id": ObjectId(query)}, {"$set": data})
            return {"status": True, "message": "Blog updated successfully!"}
        else:
            return {
                "status": False,
                "message": "The blog is not present in the database.",
            }

    def delete_blog(self, query: str) -> dict:
        if self.blogs.count_documents({"_id": ObjectId(query)}, limit=1) != 0:
            self.blogs.delete_one({"_id": ObjectId(query)})
            return {"status": True, "message": "Blog deleted successfully!"}
        else:
            return {
                "status": False,
                "message": "The blog is not present in the database.",
            }
