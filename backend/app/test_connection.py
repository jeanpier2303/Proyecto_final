from sqlalchemy import create_engine, text

engine = create_engine("mysql+mysqlconnector://root:123456J_@127.0.0.1:3310/kahua_local", pool_pre_ping=True)





try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT NOW()"))
        print("Conexión OK:", result.fetchone())
except Exception as e:
    print("Error al conectar:", e)
