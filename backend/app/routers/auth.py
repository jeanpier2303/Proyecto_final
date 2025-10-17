from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.user_schema import UserRegister, UserLogin, UserResponse
from app.services.auth_service import create_user, authenticate_user
from app.models.user import User

router = APIRouter(tags=["Autenticación"]) #Ruta a probar en postman

# Registro
@router.post("/register", response_model=UserResponse)
def register_user(user: UserRegister, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")
    new_user = create_user(db, user)
    return new_user

# Login
@router.post("/login", response_model=UserResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    user_db = authenticate_user(db, user.email, user.password)
    if not user_db:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    return user_db
