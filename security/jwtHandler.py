import time
import jwt
from typing import Dict
from helpers.constants import CONST_ALGORITHM, CONST_SECRET

JWT_SECRET = CONST_SECRET
JWT_ALGORITHM = CONST_ALGORITHM


def t_response(token: str):
    return {"access_token": token}


def signJWT(user_id: dict) -> Dict[str, str]:
    payload = {"user_id": user_id["id"], "expires": time.time() + 2592000}
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return t_response(token)


def decodeJWT(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["expires"] >= time.time() else None
    except:
        return {}
