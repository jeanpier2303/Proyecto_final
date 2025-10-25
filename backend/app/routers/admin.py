# app/routers/admin.py
from fastapi import APIRouter, Query, Body, Depends
from sqlalchemy import text
from app.db import get_connection
from app.services.admin_service import (
    get_admin_stats,
    get_sales_data,
    get_categories_data,
    get_orders,
    get_products,
    get_users,
    get_categories,
    create_category,
    delete_category,
    get_sales_details
)

router = APIRouter(tags=["Administrativo"])

@router.get("/stats")
def admin_get_stats():
    return get_admin_stats()

@router.get("/sales")
def admin_get_sales(range: int = Query(7, ge=7, le=90)):
    return get_sales_data(range)

@router.get("/categories")
def admin_get_categories_chart():
    return get_categories_data()

@router.get("/orders")
def admin_get_orders(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100)
):
    from app.services.admin_service import get_orders_paginated
    try:
        return get_orders_paginated(page=page, limit=limit)
    except Exception as e:
        print("❌ Error en /admin/orders:", e)
        raise



@router.get("/products")
def admin_get_products(category_id: int | None = Query(None), search: str | None = Query(None)):
    return get_products(category_id, search)

@router.get("/users")
def admin_get_users(role_id: int | None = Query(None)):
    return get_users(role_id)

@router.get("/categories/all")
def admin_get_all_categories():
    return get_categories()

@router.post("/categories")
def admin_add_category(name: str = Body(..., embed=True)):
    return create_category(name)

@router.delete("/categories/{category_id}")
def admin_remove_category(category_id: int):
    return delete_category(category_id)

@router.get("/sales/details")
def admin_get_sales_details():
    return get_sales_details()
