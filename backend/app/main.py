from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, cart, orders, admin, categorias, productos


app = FastAPI(title="Proyecto_end - FastAPI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluye todos tus routers con el prefijo /api
app.include_router(auth.router, prefix="/api/auth")
app.include_router(productos.router, prefix="/api/productos") # Ruta principal para Productos
app.include_router(cart.router, prefix="/api/cart")
app.include_router(orders.router, prefix="/api/orders")
app.include_router(admin.router, prefix="/api/admin")
app.include_router(categorias.router, prefix="/api/categorias") 


# Rutas que NO usarán el prefijo /api (solo la de raíz y las que dejes aquí)
# ¡IMPORTANTE! Asegúrate que products y categorias no estén duplicadas
# app.include_router(products.router) # <-- ¡Elimina o comenta esta línea!
# app.include_router(categorias.router) # <-- ¡Elimina o comenta esta línea!

@app.get("/")
def root():
    return {"message": "Bienvenido a la API de Kahua 🥭"}