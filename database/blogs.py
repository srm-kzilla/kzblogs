from helpers.constants import DB_SETTINGS
from typing import Union
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient


class Blog:
    def __init__(self, client: AsyncIOMotorClient):
        self.client = client
        self.db = client[DB_SETTINGS.DB_NAME]
        self.blogs = self.db[DB_SETTINGS.BLOGS]
        self.users = self.db[DB_SETTINGS.USERS]
        self.comments = self.db[DB_SETTINGS.COMMENTS]

    async def get_blog(self, blog_id: Union[str, None] = None, show_all: bool = True):
        if not blog_id:
            blogs = list(
                await self.blogs.find(
                    {"publish_status": True} if not show_all else {}
                ).to_list(length=None)
            )
            for i in range(len(blogs)):
                blogs[i]["_id"] = str(blogs[i]["_id"])
            return blogs
        filter = {"_id": ObjectId(blog_id)}
        filter.update({"publish_status": True} if not show_all else {})
        blog = await self.blogs.find_one(filter)
        if blog:
            blog["_id"] = str(blog["_id"])
            return blog
        return {"status": False, "message": "Blog does not exist"}

    async def create_blog(self, blog: dict):
        output = await self.blogs.insert_one(blog)
        return {
            "status": True,
            "message": "Blog created successfully",
            "id": str(output.inserted_id),
        }

    async def delete_blog(self, id: str):
        output = await self.blogs.delete_one({"_id": ObjectId(id)})
        if output.deleted_count == 0:
            return {"status": False, "message": "Blog does not exist"}
        return {"status": True, "message": "Blog deleted successfully"}

    async def update_blog(self, id: str, blog: dict):
        output = await self.blogs.update_one({"_id": ObjectId(id)}, {"$set": blog})
        if output.matched_count == 0:
            return {"status": False, "message": "Blog does not exist"}
        return {"status": True, "message": "Blog updated successfully"}

    async def add_like(self, blog_id: str, user_id: str):
        blog = self.blogs.find_one({"_id": blog_id})
        if not blog:
            return {"status": False, "message": "Blog does not exist"}
        if user_id in blog["likes"]:
            return {"status": False, "message": "User already liked the blog"}
        await self.blogs.update_one(
            {"_id": ObjectId(blog_id)}, {"$push": {"likes": user_id}}
        )
        return {"status": True, "message": "Like added successfully"}

    async def remove_like(self, id: str, user_id: str):
        output = await self.blogs.update_one(
            {"_id": ObjectId(id)}, {"$pull": {"likes": user_id}}
        )
        if output.modified_count == 0:
            return {"status": False, "message": "Blog does not exist"}
        return {"status": True, "message": "Like removed successfully"}

    async def add_comment(self, comment: dict):
        if self.blogs.count_documents({"_id": ObjectId(comment["blog_id"])}) == 0:
            return {"status": False, "message": "Blog does not exist"}
        await self.comments.insert_one(dict(comment))
        return {"status": True, "message": "Comment added successfully"}

    async def get_comments(self, blog_id):
        return list(await self.comments.find({"blog_id": blog_id}))

    async def get_trending(self, count: int = 5):
        output = await self.get_blog()
        return list(sorted(output, key=lambda x: len(x["likes"]), reverse=True))[:count]
