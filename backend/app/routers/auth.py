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
    try:
        user = authenticate_user(credentials.email, credentials.password)
        if not user:
            raise HTTPException(status_code=401, detail="Credenciales inválidas")

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
    except HTTPException as e:
        raise e
    except Exception as e:
        # Cualquier otro error se devuelve con un 500
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/register-admin")
def register_admin(user: UserRegister):
    new_user = create_user(user, role_id=4)
    return {"success": True, "data": new_user}

#------------------------------------------------------------------------------------------------------------
from app.db import get_connection
from sqlalchemy import text

@router.get("/usuarios/{user_id}")
def obtener_usuario(user_id: int):
    conn = get_connection()
    sql = text("SELECT id, first_name, last_name, email, role_id FROM users WHERE id = :id")
    result = conn.execute(sql, {"id": user_id}).fetchone()
    conn.close()
    if not result:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return dict(result._mapping)

