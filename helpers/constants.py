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


IGNORED_ROUTES = ["/docs", "/openapi.json", "/redoc", "/api/blogs", "/api/trending"]
