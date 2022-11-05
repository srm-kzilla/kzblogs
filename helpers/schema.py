from pydantic import BaseModel


class BlogSchema(BaseModel):
    blog_title: str
    blog_body: str
    blog_entry_image: str
    author: str
    readtime_min: int
    date_modified: str
    category: list[str]
    blog_publish_status: bool
