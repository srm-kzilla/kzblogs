from pydantic import BaseModel


class Blog(BaseModel):
    name: str
    publish_status: bool
    author: str
    likes: list
    content: str


class Comment(BaseModel):
    content: str
    author_id: str
    blog_id: str


class AddBlog(BaseModel):
    name: str
    content: str
    publish_status: bool
    author: str


class Like(BaseModel):
    user_id: str


class Bookmark(BaseModel):
    user_id: str
