from pydantic import BaseModel
from typing import Union


class BlogSchema(BaseModel):
    blog_title: str
    blog_body: str
    blog_entry_image: str
    author: str
    readtime_min: int
    date_modified: str
    category: list[str]
    blog_publish_status: bool

class UpdateBlogSchema(BaseModel):
    blog_title: Union[str, None]=None
    blog_body: Union[str, None]=None
    blog_entry_image: Union[str, None]=None
    author: Union[str, None]=None
    readtime_min: Union[int, None]=None
    date_modified: Union[str, None]=None
    category: list[Union[str, None]]=None
    blog_publish_status: Union[bool, None]=None
