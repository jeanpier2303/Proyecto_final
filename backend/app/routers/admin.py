from fastapi import APIRouter

router = APIRouter(tags=["Administrador"])

@router.get("/check")
def check_admin():
    return {"message": "Router del administrador funcionando correctamente 🧠"}
