from pydantic import BaseModel


class Blog(BaseModel):
    name: str
    publish_status: bool
    id: str
    author: str
    likes: list
    content: str


class User(BaseModel):
    id: str
    name: str
    username: str
    avatar: str
    bookmarks: str
    google_id: str
    is_admin: bool


class Comment(BaseModel):
    id: str
    blog_id: str
    user_id: str
    content: str
