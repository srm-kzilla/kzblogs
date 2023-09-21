from pymongo import MongoClient
from pymongo.database import Database
from bson import ObjectId
from typing import Union

from helpers.constants import DB_SETTINGS


class Blogs:
    def __init__(self, client: MongoClient, database: Database):
        self.client = client
        self.db = database
        self.blogs = self.db[DB_SETTINGS.BLOGS]
        self.comments = self.db[DB_SETTINGS.COMMENTS]
        self.users = self.db[DB_SETTINGS.USERS]

    def blog_exists(self, blog_id: str):
        return (
            {"status": False, "message": "Blog does not exist"}
            if self.blogs.count_documents({"_id": ObjectId(blog_id)}) == 0
            else {"status": True}
        )

    def get_blog(self, blog_id: Union[str, None] = None) -> Union[dict, list]:
        if blog_id and self.blog_exists(blog_id)["status"]:
            return dict(self.blogs.find_one({"_id": ObjectId(blog_id)}))
        return list(self.blogs.find())

    def create_blog(self, blog: dict):
        output = self.blogs.insert_one(blog)
        return {
            "status": True,
            "message": "Blog created successfully",
            "id": str(output.inserted_id),
        }

    def delete_blog(self, id: str):
        if not (output := self.blog_exists(id))["status"]:
            return output
        self.blogs.delete_one({"_id": ObjectId(id)})
        return {"status": True, "message": "Blog deleted successfully"}

    def update_blog(self, id: str, blog: dict):
        if not (output := self.blog_exists(id))["status"]:
            return output
        self.blogs.update_one({"_id": ObjectId(id)}, {"$set": blog})
        return {"status": True, "message": "Blog updated successfully"}

    def add_like(self, id: str, user_id: str):
        if not (output := self.blog_exists(id))["status"]:
            return output
        self.blogs.update_one({"_id": ObjectId(id)}, {"$push": {"likes": user_id}})
        return {"status": True, "message": "Like added successfully"}

    def add_comment(self, id: str, user_id: str, comment: str):
        if not (output := self.blog_exists(id))["status"]:
            return output
        self.comments.insert_one(
            {"blog_id": id, "user_id": user_id, "content": comment}
        )
        return {"status": True, "message": "Comment added successfully"}
