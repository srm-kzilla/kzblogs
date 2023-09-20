from pymongo import MongoClient
from helpers.constants import DB_SETTINGS

client = MongoClient(DB_SETTINGS.MONGODB_URI)

class Database:
    def __init__(self):
        self.db = client[DB_SETTINGS.DB_NAME]
        self.blogs = self.db[DB_SETTINGS.BLOGS]
        self.users = self.db[DB_SETTINGS.USERS]
        self.comments = self.db[DB_SETTINGS.COMMENTS]