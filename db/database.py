from pymongo import MongoClient, database
from pymongo.database import Database
import os, logging
from typing import Final

CONST_MONGODB_URI: Final = os.environ.get("MONGO_DB_URI")

if CONST_MONGODB_URI is None:
    print("[ERROR] Please specifiy mongodb url")


class MongoDbConnection:
    """Handle MongoDB connection settings."""

    def __init__(self):
        """Create the MongoDB connection."""

        self.uri = os.environ.get(
            "CONST_MONGODB_URI",
            "mongodb+srv://aQuErMAS:iKNUDPcBQZ5aIY36@kz-blogs.vlcvt24.mongodb.net/?retryWrites=true&w=majority",
        )
        self.db: Database
        self.client: MongoClient

        self.client = MongoClient(self.uri)
        self.db = database.Database(self.client, "kzblogs")

        print("MongoDB Connected!")

    def __del__(self):
        """Delete this instance."""

        self.disconnect()

    def disconnect(self) -> None:
        """Stop the connection."""

        try:
            self.client.close()

        except Exception as e:
            raise e
