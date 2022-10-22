import os

from dotenv import load_dotenv

load_dotenv(".env")

CONST_DB_SETTINGS = {"MONGO_DB_URI": os.environ.get("MONGO_DB_URI")}

# TODO: To create a mapping with dict ,for all the env variable
# obj[mongo_db_uri] -> env.mongo_db_uri
