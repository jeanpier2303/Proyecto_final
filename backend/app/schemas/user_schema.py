from pydantic import BaseModel, EmailStr

# Recibimos al registrar
class UserRegister(BaseModel):
    first_name: str
    last_name: str
    identification_type_id: int
    identification_number: str
    phone: str
    email: EmailStr  # Validación de email
    password: str

# Datos de respuesta (sin contraseña)
class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr

    class Config:
        from_attributes = True  #  Compatibilidad con Pydantic v2

# Datos para login
class UserLogin(BaseModel):
    email: EmailStr
    password: str
