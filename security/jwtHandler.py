import time
import jwt
from typing import Dict
from helpers.constants import (
    CONST_ALGORITHM as JWT_ALGORITHM,
    CONST_SECRET as JWT_SECRET,
)


def signJWT(user: dict) -> Dict[str, str]:
    payload = {
        "user_id": user["id"],
        "is_admin": user["is_admin"],
        "expires": time.time() + 2592000,
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return {"access_token": token}


def decodeJWT(token: str) -> dict:
    decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    return (
        decoded_token
        if decoded_token and decoded_token["expires"] >= time.time()
        else False
    )
