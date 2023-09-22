from pydantic import BaseModel


class Blog(BaseModel):
    name: str
    publish_status: bool
    author: str
    likes: list
    content: str


class User(BaseModel):
    name: str
    username: str
    avatar: str
    bookmarks: list
    google_id: str
    is_admin: bool


class Like(BaseModel):
    user_id: str


class Bookmark(BaseModel):
    user_id: str


class Comment(BaseModel):
    content: str
    author_id: str
    blog_id: str
