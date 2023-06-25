from fastapi import Response, Request, APIRouter as Router, FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from json import dumps
from db.database import MongoDbConnection,database
import jwt
import time


router = Router()
SECRET_KEY = "your-secret-key"

bearer = HTTPBearer()

def generate_token(username: str, password: str) -> str:
    if username not in MongoDbConnection or MongoDbConnection[username]["password"] != password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    payload = {"username": username,
               "password":password,
               "expires": time.time() + 2592000
               }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token

def authenticate_token(credentials: HTTPAuthorizationCredentials = Depends(bearer)) -> dict:
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.DecodeError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.get("/jwt_authenticate")
async def protected_route(payload: dict = Depends(authenticate_token)):
    return {"message": "This route is protected!", "payload": payload}

@router.post("/jwt_token")
async def login(username: str, password: str):
    token = generate_token(username,password)
    return {"token": token}

@router.get("/all")
async def get_all(req: Request) -> Response:
    try:
        results: list = database.get_blogs()
        return Response(dumps(results), status_code=200, media_type="application/json")
    except Exception as e:
        print(e)
        return Response(
            dumps({"status": False, "message": "Oops! something went wrong"}),
            status_code=500,
            media_type="application/json",
        )


@router.get("/article/{slug}")
async def get_article(req: Request, slug: str) -> Response:
    try:
        results: dict = database.get_blogs(slug)
        if "message" not in results:
            return Response(
                dumps(results), status_code=200, media_type="application/json"
            )
        else:
            return Response(
                dumps(results), status_code=404, media_type="application/json"
            )
    except Exception as e:
        print(e)
        return Response(
            dumps({"status": False, "message": "Oops! something went wrong"}),
            status_code=500,
            media_type="application/json",
        )


@router.post("/like/{slug}")
async def like_article(req: Request, slug: str) -> Response:
    try:
        results: dict = database.get_blogs(slug)
        results["likes_count"] += 1
        output = database.update_blog(results["id"], results)
        return Response(
            dumps(output),
            status_code=200 if output["status"] else 404,
            media_type="application/json",
        )
    except Exception as e:
        print(e)
        return Response(
            dumps({"status": False, "message": "Oops! something went wrong"}),
            status_code=500,
            media_type="application/json",
        )
