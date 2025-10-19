# app/routers de registro y login
from fastapi import APIRouter, HTTPException
from app.schemas.user_schema import UserRegister, UserLogin
from app.services.auth_service import create_user, authenticate_user

router = APIRouter(tags=["Autenticación"])

#  Registro
@router.post("/register")
def register_user(user: UserRegister):
    new_user = create_user(user)
    return {"success": True, "data": new_user}

# Login
@router.post("/login")
def login_user(credentials: UserLogin):
    user = authenticate_user(credentials.email, credentials.password)
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    
    # Se puedes generar un token simple (no JWT aún)
    return {
        "success": True,
        "user": {
            "id": user["id"],
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "email": user["email"],
            "role_id": user["role_id"]
        }
    }
