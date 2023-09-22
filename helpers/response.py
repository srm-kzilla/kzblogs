from fastapi import Response
from json import dumps


class Response(Response):
    """Custom Response class to return JSON data"""
    def __init__(
        self,
        content: dict,
        media_type="application/json",
        status_code=200,
        headers=None,
        *args,
        **kwargs
    ):
        super().__init__(
            content=dumps(content),
            media_type=media_type,
            status_code=status_code,
            headers=headers,
            *args,
            **kwargs
        )
