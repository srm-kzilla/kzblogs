import os

from dotenv import load_dotenv

load_dotenv(".env")

CONST_DB_SETTINGS = {"MONGO_DB_URI": os.environ.get("MONGO_DB_URI")}
CONST_SECRET = os.environ.get("SECRET")
CONST_ALGORITHM = os.environ.get("ALGORITHM")