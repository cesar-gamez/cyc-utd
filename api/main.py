from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import roster, health, contact

app = FastAPI(
    title="Consult Your Community API",
    description="API for fetching team member information",
    docs_url="/api/py/docs", 
    openapi_url="/api/py/openapi.json", 
    redoc_url="/api/py/redoc"
)

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"]
)

app.include_router(roster.router)
app.include_router(health.router)
app.include_router(contact.router)