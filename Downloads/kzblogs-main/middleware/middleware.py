from fastapi import FastAPI
app = FastAPI()
@app.middleware("http")
async def log_request(request, call_next):
    print(f"Received request: {request.method} {request.url}")
    response = await call_next(request)
    return response