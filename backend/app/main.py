from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, products, cart, orders, admin

app = FastAPI(title="Proyecto_end - FastAPI")

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:3000"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth")
app.include_router(products.router, prefix="/api/products")
app.include_router(cart.router, prefix="/api/cart")
app.include_router(orders.router, prefix="/api/orders")
app.include_router(admin.router, prefix="/api/admin")
