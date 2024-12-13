from fastapi import APIRouter

router = APIRouter()

@router.get("/api/py/health_check")
def health_check():
    return {"status": "healthy"}