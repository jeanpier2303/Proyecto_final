import os
from dotenv import load_dotenv

#variables desde .env
load_dotenv()

class Settings:
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_USER = os.getenv("DB_USER", "root")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "123456J_")
    DB_NAME = os.getenv("DB_NAME", "kahua_local")

settings = Settings()
