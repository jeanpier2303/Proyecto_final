from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.db import get_db
from app.db import get_connection

router = APIRouter(
    prefix="/api/delivery",
    tags=["Delivery"]
)


@router.get("/orders")
def get_delivery_orders(delivery_id: int, db: Session = Depends(get_db)):

    # verificar que el usuario existe y es repartidor
    conn = get_connection()
    sql_user = text("SELECT role_id FROM users WHERE id = :id")
    user = conn.execute(sql_user, {"id": delivery_id}).fetchone()
    conn.close()

    if not user:
        raise HTTPException(404, "Usuario no encontrado")

    if user.role_id != 8:  # role_id del repartidor
        raise HTTPException(403, "No autorizado")

    # obtener pedidos asignados
    assignments = db.execute(text("""
        SELECT o.*
        FROM delivery_assignments da
        JOIN orders o ON o.id = da.order_id
        WHERE da.delivery_id = :delivery_id
    """), {"delivery_id": delivery_id}).fetchall()

    return [dict(row._mapping) for row in assignments]


@router.put("/orders/{order_id}/status")
def update_order_status(order_id: int, status_id: int, delivery_id: int, db: Session = Depends(get_db)):

    # verificar asignación válida
    conn = get_connection()
    sql = text("""
        SELECT 1 FROM delivery_assignments
        WHERE order_id = :order_id AND delivery_id = :delivery_id
    """)
    assigned = conn.execute(sql, {"order_id": order_id, "delivery_id": delivery_id}).fetchone()
    conn.close()

    if not assigned:
        raise HTTPException(403, "Pedido no asignado a este repartidor")

    # actualizar estado
    db.execute(text("""
        UPDATE orders SET status_id = :status_id
        WHERE id = :order_id
    """), {"status_id": status_id, "order_id": order_id})

    db.commit()

    return {"message": "Estado actualizado correctamente"}




@router.post("/assign/{order_id}")
def assign_order(order_id: int, delivery_id: int, db: Session = Depends(get_db)):

    # verificar repartidor
    conn = get_connection()
    sql = text("SELECT id FROM users WHERE id = :id AND role_id = 8") 
    d = conn.execute(sql, {"id": delivery_id}).fetchone()
    conn.close()

    if not d:
        raise HTTPException(400, "El usuario no es repartidor")

    # insertar o actualizar asignación
    existing = db.execute(text("""
        SELECT id FROM delivery_assignments WHERE order_id = :order_id
    """), {"order_id": order_id}).fetchone()

    if existing:
        db.execute(text("""
            UPDATE delivery_assignments
            SET delivery_id = :delivery_id
            WHERE order_id = :order_id
        """), {"delivery_id": delivery_id, "order_id": order_id})
    else:
        db.execute(text("""
            INSERT INTO delivery_assignments (order_id, delivery_id)
            VALUES (:order_id, :delivery_id)
        """), {"order_id": order_id, "delivery_id": delivery_id})

    db.commit()

    return {"message": "Pedido asignado correctamente"}



#-------------------------------------------------
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.services.delivery_service import get_orders_for_delivery

router = APIRouter(prefix="/api/delivery", tags=["Delivery"])

@router.get("/orders")
def get_delivery_orders(delivery_id: int, db: Session = Depends(get_db)):
    return get_orders_for_delivery(db, delivery_id)
