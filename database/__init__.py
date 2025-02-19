from motor.motor_asyncio import AsyncIOMotorClient
from helpers.constants import DB_SETTINGS
from database.blogs import Blog
from database.users import User

client = AsyncIOMotorClient(DB_SETTINGS.MONGODB_URI)


class MongoDBConnection:
    def __init__(self):
        self.db = client[DB_SETTINGS.DB_NAME]
        self.blogs = Blog(client)
        self.users = User(client)
