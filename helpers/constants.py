from dotenv import load_dotenv
import os

load_dotenv()


class DB_SETTINGS:
    MONGODB_URI = os.getenv("MONGODB_URI")
    DB_NAME = os.getenv("DB_NAME") or "kzblogs"
    BLOGS = "blogs"
    USERS = "users"
    COMMENTS = "comments"
    SESSIONS = "sessions"
