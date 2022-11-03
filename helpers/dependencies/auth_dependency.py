from fastapi import Header, HTTPException
from os import environ

class bearer_auth_dependency:
    async def auth_check(Authorization: str = Header(default = None)):
        if Authorization == None:
            raise HTTPException(status_code=403, detail="No authorization")
        else:
            header_values=Authorization.split()
            if header_values[0]=="Bearer" and header_values[1]==environ['BEARER_TOKEN']:
                return
            else:
                raise HTTPException(status_code=403, detail="Invalid token")