from fastapi import APIRouter

router = APIRouter(prefix="/health", tags=["health"])

@router.get("")
async def health_check():
    return {
        "status": "healthy",
        "service": "StadiumOps AI",
        "version": "1.0.0"
    }
