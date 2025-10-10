from fastapi import APIRouter

router = APIRouter(tags=["Órdenes"])

@router.get("/check")
def check_orders():
    return {"message": "Router de órdenes funcionando correctamente 📦"}
