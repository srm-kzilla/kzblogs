from dotenv import load_dotenv
import os

load_dotenv()


class DB_SETTINGS:
    MONGODB_URI = os.getenv("MONGO_DB_URI")
    DB_NAME = os.getenv("DB_NAME") or "kzblogs"
    BLOGS = "blogs"
    USERS = "users"
    COMMENTS = "comments"
    SESSIONS = "sessions"


class DEFAULT:
    USER = {
        "name": "Anonymous",
        "_id": "",
        "image": "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png",
    }
