from fastapi import FastAPI

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json", redoc_url="/api/py/redoc")

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}