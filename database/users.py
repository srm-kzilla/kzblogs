from helpers.constants import DB_SETTINGS, DEFAULT
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from typing import List


class User:
    def __init__(self, client: AsyncIOMotorClient):
        self.client = client
        self.db = self.client[DB_SETTINGS.DB_NAME]
        self.blogs = self.db[DB_SETTINGS.BLOGS]
        self.users = self.db[DB_SETTINGS.USERS]
        self.comments = self.db[DB_SETTINGS.COMMENTS]
        self.sessions = self.db[DB_SETTINGS.SESSIONS]

    async def get_user(self, user_id: str, show_blogs: bool = False):
        if not ObjectId.is_valid(user_id):
            return None
        user = await self.users.find_one({"_id": ObjectId(user_id)})
        if isinstance(user, dict) and show_blogs:
            user["blogs"] = await self.blogs.find({"author": user_id}).to_list(
                length=None
            )
            for i in range(len(user["blogs"])):
                user["blogs"][i]["_id"] = str(user["blogs"][i]["_id"])
        return user

    async def delete_user(self, user_id: str):
        if not ObjectId.is_valid(user_id):
            return {"status": False, "message": "Invalid user id"}
        output = await self.users.delete_one({"_id": ObjectId(user_id)})
        if output.deleted_count == 0:
            return {"status": False, "message": "User does not exist"}
        return {"status": True, "message": "User deleted successfully"}

    async def bookmark(self, user_id: str, blog_id: str):
        user = await self.get_user(user_id)
        if not user:
            return {"status": False, "message": "User does not exist"}
        if blog_id in user.get("bookmarks", []):
            await self.users.update_one(
                {"_id": ObjectId(user_id)},
                {"$pull": {"bookmarks": blog_id}},
            )
            return {"status": True, "message": "Bookmark removed successfully"}
        else:
            await self.users.update_one(
                {"_id": ObjectId(user_id)},
                {"$push": {"bookmarks": blog_id}},
            )
            return {"status": True, "message": "Bookmark added successfully"}

    async def get_bookmarks(self, user_id: str):
        user = await self.get_user(user_id)
        if not user:
            return {"status": False, "message": "User does not exist"}
        bookmarks: List[dict] = list(
            await self.blogs.find(
                {"_id": {"$in": [ObjectId(i) for i in user.get("bookmarks", [])]}}
            ).to_list(length=None)
        )
        author_ids = list(
            set([ObjectId(i.get("author")) for i in bookmarks if i.get("author")])
        )
        authors = {
            str(i["_id"]): i.update({"_id": str(i["_id"])}) or i
            for i in await self.users.find({"_id": {"$in": author_ids}}).to_list(
                length=None
            )
        }
        for i in range(len(bookmarks)):
            bookmarks[i]["_id"] = str(bookmarks[i]["_id"])
            bookmarks[i]["author"] = authors.get(
                bookmarks[i].get("author"),
                DEFAULT.USER,
            )
            bookmarks[i]["is_liked"] = str(user_id) in bookmarks[i].get("likes", [])
        return [(i.update({"_id": str(i["_id"])}) or i) for i in bookmarks]

    async def verify_session(self, session_id: str):
        session = await self.sessions.find_one({"sessionToken": session_id})
        return None if not session else await self.get_user(str(session.get("userId")))

    async def follow(self, user_id: str, follow_id: str):
        if user_id == follow_id:
            return {"status": False, "message": "You cannot follow yourself"}
        user = await self.get_user(user_id)
        follow = await self.get_user(follow_id)
        if not user or not follow:
            return {"status": False, "message": "User does not exist"}
        if follow_id not in user.get("following", []):
            await self.users.update_one(
                {"_id": ObjectId(user_id)},
                {"$push": {"following": follow_id}},
            )
            await self.users.update_one(
                {"_id": ObjectId(follow_id)},
                {"$push": {"followers": user_id}},
            )
            return {"status": True, "message": "Followed successfully"}
        else:
            await self.users.update_one(
                {"_id": ObjectId(user_id)},
                {"$pull": {"following": follow_id}},
            )
            await self.users.update_one(
                {"_id": ObjectId(follow_id)},
                {"$pull": {"followers": user_id}},
            )
            return {"status": True, "message": "Unfollowed successfully"}

    async def get_trending_users(self, count: int = 5):
        sorted_users = (
            await self.users.find({"is_admin": True})
            .sort("followers", -1)
            .limit(count)
            .to_list(length=None)
        )
        for i in range(len(sorted_users)):
            sorted_users[i]["_id"] = str(sorted_users[i]["_id"])
            sorted_users[i].pop("bookmarks")
        return sorted_users
