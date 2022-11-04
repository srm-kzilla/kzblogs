from pydantic import BaseModel
import datetime
class ABC(BaseModel):
    blog_title: str
    blog_body: str
    blog_entry_image: str
    author: str
    readtime_min: int
    date_published: str
    date_modified: str
    likes_count: int
    slug: str
    category: list[str]
    blog_publish_status: bool
    uid: str

