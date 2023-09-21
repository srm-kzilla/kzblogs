from database import MongoDBConnection as Database
from typing import Callable


def test(func: Callable, *args, **kwargs):
    try:
        output = func(*args, **kwargs)
        print("✅ Test passed {}".format(func.__name__))
        return output
    except Exception as e:
        print("❎ Test failed {}".format(func.__name__))
        print("Error: {}".format(e))


def test_db():
    db = Database()
    id = test(
        db.blogs.create_blog,
        {
            "title": "Test",
            "content": "Test",
            "author": "Test",
            "likes": [],
            "publish_status": True,
        },
    )["id"]
    test(db.blogs.get_blog)
    test(db.blogs.get_blog, id)
    test(
        db.blogs.update_blog,
        id,
        {
            "title": "new",
            "content": "Test",
            "author": "new",
            "likes": [],
            "publish_status": True,
        },
    )
    test(db.blogs.delete_blog, id)


if __name__ == "__main__":
    test_db()
