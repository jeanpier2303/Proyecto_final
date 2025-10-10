from fastapi import APIRouter

router = APIRouter(tags=["Autenticación"])

@router.get("/check")
def check_status():
    return {"message": "Auth router funcionando correctamente "}
