from sqlalchemy.orm import Session
from app.models.delivery_assignments import DeliveryAssignment
from app.models.orders import Order, OrderItem
from app.models.user import User
from app.models.addresses import Address
from app.models.producto import Producto
from app.models.statuses import Status


def get_orders_for_delivery(db: Session, delivery_id: int):

    assignments = (
        db.query(DeliveryAssignment)
        .filter(DeliveryAssignment.delivery_id == delivery_id)
        .all()
    )

    if not assignments:
        return []

    orders_response = []

    for a in assignments:

        order = db.query(Order).filter(Order.id == a.order_id).first()
        if not order:
            continue

        # Cliente
        customer = db.query(User).filter(User.id == order.user_id).first()

        # Dirección (busca la default o la primera)
        address = (
            db.query(Address)
            .filter(Address.user_id == customer.id)
            .order_by(Address.is_default.desc())
            .first()
        )

        # Productos
        items = (
            db.query(OrderItem, Producto)
            .join(Producto, OrderItem.product_id == Producto.id)
            .filter(OrderItem.order_id == order.id)
            .all()
        )

        productos = [
            {
                "nombre": p.name,
                "cantidad": item.quantity,
                "precio": float(item.price),
                "subtotal": float(item.price * item.quantity)
            }
            for item, p in items
        ]

        # Estado (con label si existe)
        estado = db.query(Status).filter(Status.id == order.status_id).first()

        orders_response.append({
            "id": order.id,
            "total": float(order.total),
            "fecha": order.created_at,

            # Cliente
            "cliente": f"{customer.first_name} {customer.last_name}",
            "telefono": customer.phone,

            # Dirección
            "direccion": address.street if address else "Sin dirección registrada",

            # Productos
            "productos": productos,

            # Estado
            "estado": estado.label.lower() if estado else "pendiente"
        })

    return orders_response
