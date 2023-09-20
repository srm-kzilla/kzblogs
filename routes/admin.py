from fastapi import APIRouter, Request, Response
from typing import Union

from database import MongoDBConnection as Database

router = APIRouter()
database = Database()
