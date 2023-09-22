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
        if user := self.users.find_one({"_id": ObjectId(user_id)}):
            return dict(user)
        return {"status": False, "message": "User does not exist"}

    def add_user(self, user: dict):
        output = self.users.insert_one(user)
        return {
            "status": True,
            "message": "User added successfully",
            "user_id": output.inserted_id,
        }

    def delete_user(self, user_id: str):
        output = self.users.delete_one({"_id": ObjectId(user_id)})
        if output.deleted_count == 0:
            return {"status": False, "message": "User does not exist"}
        return {"status": True, "message": "User deleted successfully"}

    def add_bookmarks(self, user_id: str, blog_id: str):
        output = self.users.update_one(
            {"_id": ObjectId(user_id)}, {"$push": {"bookmarks": blog_id}}
        )
        if output.modified_count == 0:
            return {"status": False, "message": "User does not exist"}
        return {"status": True, "message": "Bookmark added successfully"}

    def remove_bookmarks(self, user_id: str, blog_id: str):
        output = self.users.update_one(
            {"_id": ObjectId(user_id)}, {"$pull": {"bookmarks": blog_id}}
        )
        if output.modified_count == 0:
            return {"status": False, "message": "User does not exist"}
        return {"status": True, "message": "Bookmark removed successfully"}

    def get_bookmarks(self, user_id: str):
        user = self.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return {"status": False, "message": "User does not exist"}
        bookmarks = user.get("bookmarks", [])
        bookmarks = list(
            self.blogs.find({"_id": {"$in": bookmarks}}) if bookmarks else []
        )
        return bookmarks
