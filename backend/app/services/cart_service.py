# app/services/cart_service.py
from sqlalchemy import text
from sqlalchemy.orm import Session
import uuid

# Helper: convertir Row a dict
def _row_to_dict(row):
    return dict(row._mapping) if row is not None else None


def get_cart_by_user(db: Session, user_id: int):
    sql = text("SELECT * FROM carts WHERE user_id = :user_id ORDER BY id DESC LIMIT 1")
    row = db.execute(sql, {"user_id": user_id}).fetchone()
    return _row_to_dict(row)


def create_cart(db: Session, user_id: int):
    token = str(uuid.uuid4())
    sql = text("INSERT INTO carts (user_id, token, created_at, updated_at) VALUES (:user_id, :token, NOW(), NOW())")
    db.execute(sql, {"user_id": user_id, "token": token})
    db.commit()
    last = db.execute(text("SELECT LAST_INSERT_ID() AS id")).fetchone()
    cart_id = last._mapping["id"]
    row = db.execute(text("SELECT * FROM carts WHERE id = :id"), {"id": cart_id}).fetchone()
    return _row_to_dict(row)


def ensure_cart(db: Session, user_id: int):
    cart = get_cart_by_user(db, user_id)
    if cart:
        return cart
    return create_cart(db, user_id)


def add_item(db: Session, user_id: int, product_id: int, qty: int):
    if qty <= 0:
        raise ValueError("Quantity must be greater than zero")

    # Ensure cart exists
    cart = ensure_cart(db, user_id)
    cart_id = cart["id"]

    # Get current product price
    p = db.execute(text("SELECT id, price, name FROM products WHERE id = :pid"), {"pid": product_id}).fetchone()
    if not p:
        raise ValueError("Product not found")
    product = _row_to_dict(p)
    unit_price = product["price"]

    # Check if item already in cart
    existing = db.execute(text("SELECT * FROM cart_items WHERE cart_id = :cart_id AND product_id = :product_id"),
                          {"cart_id": cart_id, "product_id": product_id}).fetchone()

    if existing:
        # Update quantity and unit_price (use latest price)
        new_qty = existing._mapping["qty"] + qty
        db.execute(text("UPDATE cart_items SET qty = :qty, unit_price = :unit_price WHERE id = :id"),
                   {"qty": new_qty, "unit_price": unit_price, "id": existing._mapping["id"]})
    else:
        # Insert new item
        db.execute(text("""
            INSERT INTO cart_items (cart_id, product_id, qty, unit_price, created_at)
            VALUES (:cart_id, :product_id, :qty, :unit_price, NOW())
        """), {"cart_id": cart_id, "product_id": product_id, "qty": qty, "unit_price": unit_price})

    db.commit()
    return get_cart_items(db, user_id)


def get_cart_items(db: Session, user_id: int):
    # Get cart
    cart = get_cart_by_user(db, user_id)
    if not cart:
        return {"cart": None, "items": []}

    cart_id = cart["id"]
    sql = text("""
        SELECT ci.id AS item_id, ci.cart_id, ci.product_id, ci.qty, ci.unit_price, ci.created_at,
               p.name AS product_name, p.slug AS product_slug, p.price AS product_price
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = :cart_id
    """)
    rows = db.execute(sql, {"cart_id": cart_id}).fetchall()
    items = [dict(r._mapping) for r in rows]

    # Calculate totals if you want
    subtotal = sum(item["qty"] * item["unit_price"] for item in items) if items else 0.0

    return {
        "cart": cart,
        "items": items,
        "subtotal": subtotal
    }


def update_item(db: Session, item_id: int, qty: int):
    # 
    existing = db.execute(text("SELECT * FROM cart_items WHERE id = :id"), {"id": item_id}).fetchone()
    if not existing:
        return None

    if qty <= 0:
        db.execute(text("DELETE FROM cart_items WHERE id = :id"), {"id": item_id})
        db.commit()
        return {"deleted": item_id}

    db.execute(text("UPDATE cart_items SET qty = :qty WHERE id = :id"), {"qty": qty, "id": item_id})
    db.commit()
    updated = db.execute(text("SELECT * FROM cart_items WHERE id = :id"), {"id": item_id}).fetchone()
    return _row_to_dict(updated)


def remove_item(db: Session, item_id: int):
    existing = db.execute(text("SELECT * FROM cart_items WHERE id = :id"), {"id": item_id}).fetchone()
    if not existing:
        return None
    db.execute(text("DELETE FROM cart_items WHERE id = :id"), {"id": item_id})
    db.commit()
    return {"deleted": item_id}


def clear_cart(db: Session, user_id: int):
    cart = get_cart_by_user(db, user_id)
    if not cart:
        return {"deleted_count": 0}
    res = db.execute(text("DELETE FROM cart_items WHERE cart_id = :cart_id"), {"cart_id": cart["id"]})
    db.commit()
    # res.rowcount may be available; use SELECT count if needed
    return {"deleted_count": res.rowcount if hasattr(res, "rowcount") else None}
