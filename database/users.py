from pymongo import MongoClient
from pymongo.database import Database
from bson import ObjectId

from helpers.constants import DB_SETTINGS


class Users:
    def __init__(self, client: MongoClient, database: Database):
        self.client = client
        self.db = database
        self.users = self.db[DB_SETTINGS.USERS]
        self.blogs = self.db[DB_SETTINGS.BLOGS]

    def get_user(self, user_id: str):
        if self.users.count_documents({"_id": ObjectId(user_id)}) == 0:
            return {"status": False, "message": "User does not exist"}
        return dict(self.users.find_one({"_id": user_id}))

    def create_user(self, user: dict):
        self.users.insert_one(user)
        return {"status": True, "message": "User created successfully"}

    def delete_user(self, id: str):
        if self.users.count_documents({"_id": ObjectId(id)}):
            return {"status": False, "message": "User does not exist"}
        self.users.delete_one({"_id": id})
        return {"status": True, "message": "User deleted successfully"}

    def add_bookmark(self, blog_id: str, user_id: str):
        if self.blogs.count_documents({"_id": ObjectId(blog_id)}) == 0:
            return {"status": False, "message": "Blog does not exist"}
        self.users.update_one({"_id": user_id}, {"$push": {"bookmarks": blog_id}})
        return {"status": True, "message": "Bookmark added successfully"}

    def remove_bookmark(self, blog_id: str, user_id: str):
        if self.blogs.count_documents({"_id": ObjectId(blog_id)}) == 0:
            return {"status": False, "message": "Blog does not exist"}
        self.users.update_one({"_id": user_id}, {"$pull": {"bookmarks": blog_id}})
        return {"status": True, "message": "Bookmark removed successfully"}
