from fastapi import APIRouter

router = APIRouter(tags=["Carrito"])

@router.get("/check")
def check_cart():
    return {"message": "Router del carrito funcionando correctamente 🛒"}
