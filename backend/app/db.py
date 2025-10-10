import mysql.connector
from mysql.connector import pooling
from app.config import settings

#  un pool de conexiones 
dbconfig = {
    "host": settings.DB_HOST,
    "user": settings.DB_USER,
    "password": settings.DB_PASSWORD,
    "database": settings.DB_NAME,
    "charset": "utf8mb4"
}

pool = pooling.MySQLConnectionPool(pool_name="mypool", pool_size=5, **dbconfig)

def get_conn():
    """Devuelve una conexión del pool."""
    return pool.get_connection()
