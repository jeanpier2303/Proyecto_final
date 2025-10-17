from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings



# Crear Base para los modelos
Base = declarative_base()

# URL de conexión SQLAlchemy
DATABASE_URL = (
    f"mysql+mysqlconnector://{settings.DB_USER}:{settings.DB_PASSWORD}"
    f"@localhost:3310/{settings.DB_NAME}"
)

# Crear motor
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Sesión de base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependencia que obtendrá una sesión por petición
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


from app.models.user import User
from app.models.identification_type import IdentificationType