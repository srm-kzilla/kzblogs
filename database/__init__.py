from pymongo import MongoClient
from pymongo.database import Database
from database.blogs import Blogs
from database.users import Users
from helpers.constants import DB_SETTINGS
import certifi


client = MongoClient(DB_SETTINGS.MONGODB_URI, tlsCAFile=certifi.where())


class MongoDBConnection:
    def __init__(self):
        self.db = Database(client=client, name=DB_SETTINGS.DB_NAME)
        self.blogs = Blogs(client, self.db)
        self.users = Users(client, self.db)
