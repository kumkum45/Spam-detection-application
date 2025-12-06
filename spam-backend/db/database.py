from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from pathlib import Path
from dotenv import load_dotenv, find_dotenv
import os

# --- Robust .env loading ---
BASE_DIR = Path(__file__).resolve().parent.parent
env_path = find_dotenv()

print(f"🔍 DEBUG: BASE_DIR = {BASE_DIR}")
print(f"🔍 DEBUG: Loading .env from = {env_path}")

if env_path:
    load_dotenv(dotenv_path=env_path, override=True)
else:
    print("⚠️ WARNING: No .env file found with find_dotenv()")

DATABASE_URL = os.getenv("DATABASE_URL")
print(f"🔍 DEBUG: DATABASE_URL from env = {DATABASE_URL!r}")

if not DATABASE_URL:
    raise RuntimeError(
        f"DATABASE_URL not found. Tried {env_path or '.env in current and parent dirs'}.\n"
        "Create .env with e.g.:\n"
        "DATABASE_URL=postgresql+psycopg2://User:hackhers@localhost:5432/spam_db"
    )

# --- SQLAlchemy setup ---
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- Dependency function ---
def get_db():
    """Yield a new database session for each request."""
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
