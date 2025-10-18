from sqlalchemy import text
from app.db import get_connection
from app.schemas.user_schema import UserRegister
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def create_user(user_data: UserRegister):
    conn = get_connection()
    hashed_password = get_password_hash(user_data.password)
    sql = text("""
        INSERT INTO users (first_name, last_name, identification_type_id, identification_number, phone, email, password_hash, role_id)
        VALUES (:first_name, :last_name, :identification_type_id, :identification_number, :phone, :email, :password_hash, 5)
    """)
    conn.execute(sql, {
        "first_name": user_data.first_name,
        "last_name": user_data.last_name,
        "identification_type_id": user_data.identification_type_id,
        "identification_number": user_data.identification_number,
        "phone": user_data.phone,
        "email": user_data.email,
        "password_hash": hashed_password
    })
    conn.commit()
    nuevo = conn.execute(text("SELECT * FROM users ORDER BY id DESC LIMIT 1")).fetchone()
    conn.close()
    return dict(nuevo._mapping)

def authenticate_user(email: str, password: str):
    conn = get_connection()
    sql = text("SELECT * FROM users WHERE email = :email")
    result = conn.execute(sql, {"email": email}).fetchone()
    conn.close()
    if not result:
        return None
    user = dict(result._mapping)
    if not verify_password(password, user["password_hash"]):
        return None
    return user
