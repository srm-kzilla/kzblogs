from fastapi import APIRouter, Request, Response
from typing import Union

from database import Database

router = APIRouter()
database = Database()
