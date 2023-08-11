from fastapi import FastAPI, Request
from security import jwtHandler

def verifyAuth(app: FastAPI):
    async def log_request(request: Request, call_next):
        auth = request.headers.authorization
        if (not auth in request.headers):
            return "You need a jwt token"
        else:
            # Call middleware

            # TODO: Slice string to extract JWT
            verfiy = jwtHandler.decodeJWT(auth)
            if (not verfiy):
                return "Your token has expired. Please log in again"
            else:
                response = await call_next(request)
                return response
