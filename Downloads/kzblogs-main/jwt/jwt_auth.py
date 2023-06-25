from fastapi import Request, Response, FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from db.database import MongoDbConnection
import jwt
import time

app = FastAPI()

SECRET_KEY = "your-secret-key"

bearer = HTTPBearer()



def generate_token(req: Request, id: str)  -> str:
    if id not in MongoDbConnection:
        raise HTTPException(status_code=401, detail="Invalid Id")

    payload = {"Id": id,
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

@app.get("/jwt_token")
def protected_route(payload: dict = Depends(authenticate_token)):
    return {"message": "This route is protected!", "payload": payload}

@app.post("/jwt_authenticate")
def login(id: str):
    token = generate_token(id)
    return {"token": token}
