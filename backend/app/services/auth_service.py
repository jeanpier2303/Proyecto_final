from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user_schema import UserRegister
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def create_user(db: Session, user_data: UserRegister):
    hashed_password = get_password_hash(user_data.password)
    user = User(
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        identification_type_id=user_data.identification_type_id,
        identification_number=user_data.identification_number,
        phone=user_data.phone,
        email=user_data.email,
        password_hash=hashed_password,
        role_id=5  # Asigna automáticamente el rol "cliente"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user
