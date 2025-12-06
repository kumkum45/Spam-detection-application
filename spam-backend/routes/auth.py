from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from db.database import get_db
from models.user import User
from schemas.user_schemas import UserCreate, UserLogin, UserResponse, Token
from auth.utils import hash_password, verify_password
from auth.jwt import create_access_token, decode_access_token

router = APIRouter()

# Dependency to extract and verify token from Authorization header
def get_current_user_from_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    # Extract Bearer token
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid authentication scheme")
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload

# --- Register new user ---
@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(
        (User.email == user.email) | (User.username == user.username)
    ).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email already registered")
    
    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# --- Login ---
@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Email not found")
    
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password")
    
    access_token = create_access_token({"user_id": db_user.id, "username": db_user.username})
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user_id": db_user.id,
        "username": db_user.username
    }

# --- Get current user info ---
@router.get("/me")
def get_current_user(db: Session = Depends(get_db), current_user: dict = Depends(get_current_user_from_token)):
    user = db.query(User).filter(User.id == current_user["user_id"]).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user_id": user.id, "username": user.username, "email": user.email}