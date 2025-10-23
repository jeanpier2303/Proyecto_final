#pip install -r requirements.txt


from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings

Base = declarative_base()

# URL de conexión SQLAlchemy (ajustada para Docker local)
DATABASE_URL = (
    f"mysql+mysqlconnector://{settings.DB_USER}:{settings.DB_PASSWORD}"
    f"@localhost:3310/{settings.DB_NAME}"
)

# Crear motor y sesión
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependencia de FastAPI para obtener conexión a base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔹 Nuevo: función para obtener conexión SQL cruda directamente
def get_connection():
    return engine.connect()

# (Opcional, si decides borrar los modelos ORM)
# from app.models.user import User
# from app.models.identification_type import IdentificationType
