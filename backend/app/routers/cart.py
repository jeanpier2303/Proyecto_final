# app/routers/cart.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.services import cart_service


router = APIRouter(tags=["Cart"])

# Add item to cart (creates cart if not exists)
@router.post("/add")
def add_to_cart(payload: dict, db: Session = Depends(get_db)):
    """
    payload: {"user_id": int, "product_id": int, "qty": int}
    """
    user_id = payload.get("user_id")
    product_id = payload.get("product_id")
    qty = payload.get("qty", 1)

    if not user_id or not product_id:
        raise HTTPException(status_code=400, detail="user_id and product_id are required")

    try:
        result = cart_service.add_item(db, user_id=int(user_id), product_id=int(product_id), qty=int(qty))
        return {"success": True, "data": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# Get cart by user_id
@router.get("/{user_id}")
def get_cart(user_id: int, db: Session = Depends(get_db)):
    data = cart_service.get_cart_items(db, user_id)
    return data


# Update item qty
@router.put("/update")
def update_item(payload: dict, db: Session = Depends(get_db)):
    """
    payload: {"item_id": int, "qty": int}
    """
    item_id = payload.get("item_id")
    qty = payload.get("qty")
    if item_id is None or qty is None:
        raise HTTPException(status_code=400, detail="item_id and qty are required")
    updated = cart_service.update_item(db, int(item_id), int(qty))
    if updated is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"success": True, "data": updated}


# Remove single item
@router.delete("/item/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    removed = cart_service.remove_item(db, item_id)
    if removed is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"success": True, "data": removed}


# Clear cart for user
@router.delete("/clear/{user_id}")
def clear_cart(user_id: int, db: Session = Depends(get_db)):
    res = cart_service.clear_cart(db, user_id)
    return {"success": True, "data": res}
