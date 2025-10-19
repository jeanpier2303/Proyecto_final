from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, cart, orders, admin, categorias, productos


app = FastAPI(title="Proyecto_end - FastAPI")

origins = [
    "http://localhost:3000",   
    "http://127.0.0.1:3000",
    "http://localhost:5173",   
    "http://127.0.0.1:5173"
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


@app.get("/")
def root():
    return {"message": "Bienvenido a la API de Kahua 🥭"}