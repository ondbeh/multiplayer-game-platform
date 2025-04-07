from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel

from src.utils.users import get_users, add_user, get_user, delete_user, authenticate_user
from src.utils.env import get_env_str, get_env_int
from src.utils.access_token import create_access_token, create_refresh_token, verify_token
from src.models import User, UserCreate, Token

# OAuth2 scheme for token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI(title=get_env_str("NAME_SERVICE_AUTH", "Authentication Service"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    refresh_token = create_refresh_token(data={"sub": user.username})
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

class RefreshRequest(BaseModel):
    refresh_token: str

@app.post("/token/refresh", response_model=Token)
async def refresh_token_endpoint(request: RefreshRequest):
    token_data = verify_token(request.refresh_token, "refresh")
    if token_data is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": token_data.username})
    refresh_token = create_refresh_token(data={"sub": token_data.username})
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@app.get("/Users", response_model=List[User])
async def read_users() -> List[User]:
    return get_users()

@app.get("/User/{username}", response_model=User)
async def read_user(username: str) -> User:
    return get_user(username)

@app.post("/User", response_model=User)
async def create_user(user: UserCreate) -> User:
    return add_user(user)

@app.delete("/User/{username}", response_model=bool)
async def remove_user(username: str) -> bool:
    return delete_user(username)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=get_env_str("UVICORN_HOST_NAME", "0.0.0.0"), 
                port=get_env_int("PORT_SERVICE_AUTH", 8000))
