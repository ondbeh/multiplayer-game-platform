from pydantic import BaseModel, EmailStr, Field

class User(BaseModel):
    id: int = Field(..., description="The ID of the user")
    username: str = Field(..., description="The username of the user")
    full_name: str = Field(..., description="The full name of the user")
    email: EmailStr = Field(..., description="The email of the user")
    is_active: bool = Field(..., description="Whether the user is active or not")
    is_superuser: bool = Field(..., description="Whether the user is a superuser or not")

class UserWithPassword(User):
    hashed_password: str = Field(..., description="The hashed password of the user")
    
class UserCreate(BaseModel):
    username: str = Field(..., description="The username of the user")
    full_name: str = Field(..., description="The full name of the user")
    email: EmailStr = Field(..., description="The email of the user")
    password: str = Field(..., description="The password of the user")
    
class Token(BaseModel):
    access_token: str = Field(..., description="The access token")
    refresh_token: str = Field(..., description="The refresh token")
    token_type: str = Field(..., description="The type of the token")
    