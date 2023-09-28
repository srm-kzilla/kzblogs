from pymongo import MongoClient
from pymongo.database import Database
from bson import ObjectId
from typing import Union

from helpers.constants import DB_SETTINGS
from helpers.schemas import Comment


class Blogs:
    def __init__(self, client: MongoClient, database: Database):
        self.client = client
        self.db = database
        self.blogs = self.db[DB_SETTINGS.BLOGS]
        self.comments = self.db[DB_SETTINGS.COMMENTS]
        self.users = self.db[DB_SETTINGS.USERS]

    def get_blog(
        self, blog_id: Union[str, None] = None, show_all=False
    ) -> Union[dict, list]:
        if not blog_id:
            blogs = []
            for blog in self.blogs.find(
                {"publish_status": True} if not show_all else {}
            ):
                blog["_id"] = str(blog["_id"])
                blogs.append(blog)
            return blogs
        blog = self.blogs.find_one({"_id": ObjectId(blog_id)})
        if blog:
            blog["_id"] = str(blog["_id"])
            return blog
        return {"status": False, "message": "Blog does not exist"}

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

    def add_comment(self, comment: Comment):
        if self.blogs.count_documents({"_id": ObjectId(comment.blog_id)}) == 0:
            return {"status": False, "message": "Blog does not exist"}
        self.comments.insert_one(dict(comment))
        return {"status": True, "message": "Comment added successfully"}

    def get_comments(self, blog_id):
        return list(self.comments.find({"blog_id": blog_id}))

    def get_trending(self, count: int = 5):
        output = self.get_blog()
        return list(sorted(output, key=lambda x: len(x["likes"]), reverse=True))[:count]
