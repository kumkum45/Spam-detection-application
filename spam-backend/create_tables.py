# create_tables.py
from db.database import engine, Base
  # 👈 Import all models so Base is aware of them
from models.user import User

from db import models
print("📦 Creating database tables...")
Base.metadata.create_all(bind=engine)
print("✅ Tables created successfully.")
