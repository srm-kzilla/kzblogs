from pydantic import BaseModel
from typing import Union


class BlogSchema(BaseModel):
    blog_title: str
    blog_body: str
    blog_entry_img: str
    author: str
    date_published: int
    date_modified: int
    readtime_min: int
    likes_count: int
    slug: str
    category: list
    blog_publish_status: bool


class UpdateBlogSchema(BaseModel):
    blog_title: str
    blog_body: str
    blog_entry_img: str
    date_published: int
    date_modified: int
    readtime_min: int
    id: str
    likes_count: int
    category: list
    blog_publish_status: bool


class AddBlogSchema(BaseModel):
    blog_title: str
    blog_body: str
    blog_entry_img: str
    author: str
    category: list
    blog_publish_status: bool


class AddUserSchema(BaseModel):
    name: str
    email: str
    password: str


class UpdateUserSchema(BaseModel):
    name: str
    email: str
    password: str
    old_password: str
