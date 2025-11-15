#venv\Scripts\activate
#uvicorn app.main:app --reload --port 8001
#pip install -r requirements.txt


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, cart, orders, admin, categorias, productos
from app.routers import pedidos
#from app.routers import invoice_routes
from app.routers import invoice_routes
from app.routers.seller_orders import router as seller_orders_router
from app.routers.seller_sales import router as seller_sales_router
from app.routers.seller_history import router as seller_history_router
from app.routers import delivery





app = FastAPI(title="Proyecto_end - FastAPI")

origins = [
    "http://localhost:3000",   
    "http://127.0.0.1:3000",
    "http://localhost:5173",   
    "http://127.0.0.1:5173",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  prefijo /api
app.include_router(auth.router, prefix="/api/auth")
app.include_router(productos.router, prefix="/api/productos") # 
app.include_router(cart.router, prefix="/api/cart")
app.include_router(orders.router, prefix="/api/orders")
app.include_router(admin.router, prefix="/api/admin")
app.include_router(categorias.router, prefix="/api/categorias") 
app.include_router(pedidos.router)
app.include_router(orders.router)

# Rutas de ventas de vendedores
app.include_router(seller_orders_router)
app.include_router(seller_sales_router)
app.include_router(seller_history_router)


# Rutas de facturación
#app.include_router(invoice_routes.router)
app.include_router(invoice_routes.router)

# Rutas de delivery
app.include_router(delivery.router)




@app.get("/")
def root():
    return {"message": "Bienvenido a la API de Kahua 🥭"}