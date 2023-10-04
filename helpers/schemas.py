from pydantic import BaseModel


class Blog(BaseModel):
    name: str
    publish_status: bool
    author: str
    likes: list
    content: str


class Comment(BaseModel):
    content: str
    blog_id: str


class AddBlog(BaseModel):
    name: str
    content: str
    publish_status: bool
    author: str


class Bookmark(BaseModel):
    blog_id: str


class Like(BaseModel):
    blog_id: str
