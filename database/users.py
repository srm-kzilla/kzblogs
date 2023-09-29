from helpers.constants import DB_SETTINGS
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId


class User:
    def __init__(self, client: AsyncIOMotorClient):
        self.client = client
        self.db = self.client[DB_SETTINGS.DB_NAME]
        self.blogs = self.db[DB_SETTINGS.BLOGS]
        self.users = self.db[DB_SETTINGS.USERS]
        self.comments = self.db[DB_SETTINGS.COMMENTS]
        self.sessions = self.db[DB_SETTINGS.SESSIONS]

    async def get_user(self, user_id: str):
        return await self.users.find_one({"_id": ObjectId(user_id)})

    async def delete_user(self, user_id: str):
        output = await self.users.delete_one({"_id": ObjectId(user_id)})
        if output.deleted_count == 0:
            return {"status": False, "message": "User does not exist"}
        return {"status": True, "message": "User deleted successfully"}

    async def add_bookmark(self, user_id: str, blog_id: str):
        output = await self.users.update_one(
            {"_id": ObjectId(user_id)}, {"$push": {"bookmarks": blog_id}}
        )
        if output.modified_count == 0:
            return {"status": False, "message": "User does not exist"}
        return {"status": True, "message": "Bookmark added successfully"}

    async def remove_bookmark(self, user_id: str, blog_id: str):
        output = await self.users.update_one(
            {"_id": ObjectId(user_id)}, {"$pull": {"bookmarks": blog_id}}
        )
        if output.modified_count == 0:
            return {"status": False, "message": "User does not exist"}
        return {"status": True, "message": "Bookmark removed successfully"}

    async def get_bookmarks(self, user_id: str):
        user = await self.get_user(user_id)
        if not user:
            return {"status": False, "message": "User does not exist"}
        bookmarks = user.get("bookmarks", [])
        bookmarks = list(
            await self.blogs.find({"_id": {"$in": bookmarks}}) if bookmarks else []
        )
        return bookmarks

    async def verify_session(self, session_id: str):
        session = await self.sessions.find_one({"sessionToken": session_id})
        return None if not session else await self.get_user(str(session.get("userId")))
