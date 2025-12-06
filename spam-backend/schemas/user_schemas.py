from pydantic import BaseModel, EmailStr

# Input for registration
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

# Input for login
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Output user info
class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        orm_mode = True

# Output for token
class Token(BaseModel):
    access_token: str
    token_type: str
