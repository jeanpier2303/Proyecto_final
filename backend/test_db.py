from sqlalchemy import create_engine, text

DATABASE_URL = "mysql+mysqlconnector://usuario:123456J_@127.0.0.1:3310/kahua_local"
engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    result = conn.execute(text("SELECT NOW()"))
    print("Conexión exitosa:", result.fetchone())
