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

    def get_blog(self, blog_id: Union[str, None] = None, show_all = False) -> Union[dict, list]:
        if not blog_id:
            return list(self.blogs.find({"publish_status": True} if not show_all else {}))
        blog = self.blogs.find_one({"_id": ObjectId(blog_id)})
        return (
            dict(blog) if blog else {"status": False, "message": "Blog does not exist"}
        )

    def create_blog(self, blog: dict):
        output = self.blogs.insert_one(blog)
        return {
            "status": True,
            "message": "Blog created successfully",
            "id": str(output.inserted_id),
        }

    def delete_blog(self, id: str):
        output = self.blogs.delete_one({"_id": ObjectId(id)})
        if output.deleted_count == 0:
            return {"status": False, "message": "Blog does not exist"}
        return {"status": True, "message": "Blog deleted successfully"}

    def update_blog(self, id: str, blog: dict):
        output = self.blogs.update_one({"_id": ObjectId(id)}, {"$set": blog})
        if output.matched_count == 0:
            return {"status": False, "message": "Blog does not exist"}
        return {"status": True, "message": "Blog updated successfully"}

    def add_like(self, id: str, user_id: str):
        output = self.blogs.update_one(
            {"_id": ObjectId(id)}, {"$push": {"likes": user_id}}
        )
        if output.modified_count == 0:
            return {"status": False, "message": "Blog does not exist"}
        return {"status": True, "message": "Like added successfully"}

    def remove_like(self, id: str, user_id: str):
        output = self.blogs.update_one(
            {"_id": ObjectId(id)}, {"$pull": {"likes": user_id}}
        )
        if output.modified_count == 0:
            return {"status": False, "message": "Blog does not exist"}
        return {"status": True, "message": "Like removed successfully"}

    def add_comment(self, id: str, user_id: str, comment: str):
        if self.blogs.count_documents({"_id": ObjectId(id)}) == 0:
            return {"status": False, "message": "Blog does not exist"}
        self.comments.insert_one(
            {"blog_id": id, "user_id": user_id, "content": comment}
        )
        return {"status": True, "message": "Comment added successfully"}

    def get_comments(self, blog_id):
        return list(self.comments.find({"blog_id": blog_id}))
