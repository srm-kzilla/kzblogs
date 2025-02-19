from helpers.constants import DB_SETTINGS, DEFAULT
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

    async def get_blog(
        self,
        blog_id: Union[str, None] = None,
        show_all: bool = True,
        user_id: str = None,
        page: int = 1,
        limit: int = 0,
    ):
        if not blog_id:
            blogs = list(
                await self.blogs.find({"publish_status": True} if not show_all else {})
                .skip((page - 1) * limit)
                .limit(limit=limit)
                .to_list(length=None)
            )
            author_ids = list(set([ObjectId(i.get("author")) for i in blogs]))
            authors = {
                str(i["_id"]): i.update({"_id": str(i["_id"])}) or i
                for i in await self.users.find({"_id": {"$in": author_ids}}).to_list(
                    length=None
                )
            }
            for i in range(len(blogs)):
                blogs[i]["_id"] = str(blogs[i]["_id"])
                blogs[i]["author"] = authors.get(
                    blogs[i].get("author"),
                    DEFAULT.USER,
                )
                blogs[i]["is_liked"] = str(user_id) in blogs[i].get("likes", [])
            return blogs
        filter = {"_id": ObjectId(blog_id)}
        filter.update({"publish_status": True} if not show_all else {})
        blog = await self.blogs.find_one(filter)
        if blog:
            blog["_id"] = str(blog["_id"])
            user = await self.users.find_one({"_id": ObjectId(blog.get("author"))})
            blog["author"] = {
                "name": user.get("name"),
                "_id": str(user["_id"]),
                "image": user["image"],
            }
            blog["is_liked"] = user_id in blog.get("likes", [])
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

    async def like(self, blog_id: str, user_id: str):
        blog = await self.blogs.find_one({"_id": ObjectId(blog_id)})
        if not blog:
            return {"status": False, "message": "Blog does not exist"}
        if user_id in list(blog["likes"]):
            await self.blogs.update_one(
                {"_id": ObjectId(blog_id)}, {"$pull": {"likes": str(user_id)}}
            )
            return {"status": True, "message": "Like removed successfully"}
        else:
            await self.blogs.update_one(
                {"_id": ObjectId(blog_id)}, {"$push": {"likes": str(user_id)}}
            )
            return {"status": True, "message": "Like added successfully"}

    async def add_comment(self, comment: dict):
        if self.blogs.count_documents({"_id": ObjectId(comment["blog_id"])}) == 0:
            return {"status": False, "message": "Blog does not exist"}
        await self.comments.insert_one(dict(comment))
        return {"status": True, "message": "Comment added successfully"}

    async def delete_comment(self, comment_id: str, user_id: str):
        output = await self.comments.delete_one(
            {"_id": ObjectId(comment_id), "author_id": str(user_id)}
        )
        if output.deleted_count == 0:
            return {"status": False, "message": "Comment does not exist"}
        return {"status": True, "message": "Comment deleted successfully"}

    async def get_comments(self, blog_id: str):
        comments = await self.comments.find({"blog_id": blog_id}).to_list(length=None)
        for i in range(len(comments)):
            comments[i]["_id"] = str(comments[i]["_id"])
        return comments

    async def get_trending(self, count: int = 5, user_id: str = None):
        output = await self.get_blog(user_id=user_id, show_all=False)
        return list(sorted(output, key=lambda x: len(x.get("likes", 0)), reverse=True))[
            :count
        ]

    async def search(self, query: str):
        result = await self.blogs.aggregate(
            [
                {
                    "$search": {
                        "index": "kz_blog_index",
                        "autocomplete": {"query": query, "path": "name"},
                    }
                },
                {"$limit": 10},
                {"$project": {"name": 1, "author": 1, "_id": 1}},
            ]
        ).to_list(length=None)
        author_ids = list(
            set([ObjectId(i.get("author")) for i in result if i.get("author")])
        )
        authors = {
            str(i["_id"]): i.update({"_id": str(i["_id"])})
            or {key: i[key] for key in ["name", "image", "_id"]}
            for i in await self.users.find({"_id": {"$in": author_ids}}).to_list(
                length=None
            )
        }
        for i in range(len(result)):
            result[i]["_id"] = str(result[i]["_id"])
            result[i]["author"] = authors.get(
                result[i].get("author"),
                DEFAULT.USER,
            )
        blogs = [(x.update({"_id": str(x["_id"])}) or x) for x in result]
        users = await self.users.aggregate(
            [
                {
                    "$search": {
                        "index": "kz_user_index",
                        "autocomplete": {"query": query, "path": "name"},
                    }
                },
                {"$limit": 10},
                {
                    "$project": {
                        "name": 1,
                        "image": 1,
                        "_id": 1,
                        "followers": 1,
                        "following": 1,
                    }
                },
            ]
        ).to_list(length=None)
        for i in range(len(users)):
            users[i]["_id"] = str(users[i]["_id"])
            users[i]["followers"] = len(users[i]["followers"])
            users[i]["following"] = len(users[i]["following"])
        return {"users": users, "blogs": blogs}

    async def get_drafts(self, user_id: str):
        drafts = await self.blogs.find(
            {"author": user_id, "publish_status": False}
        ).to_list(length=None)
        for i in range(len(drafts)):
            drafts[i]["_id"] = str(drafts[i]["_id"])
        return drafts
