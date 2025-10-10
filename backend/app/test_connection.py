""" para prbar la conexin a la base de datos """

from app.db import get_conn

try:
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT DATABASE();")
    result = cursor.fetchone()
    print(f" si dio esta conrctado correctamente a la base de datos: {result[0]}")
    cursor.close()
    conn.close()
except Exception as e:
    print(f" Error mano jodidos {e}")
