from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from src.utils.users import get_users, add_user, get_user, delete_user
from src.utils.env import get_env_str, get_env_int
from src.models import User, UserCreate

app = FastAPI(title=get_env_str("NAME_SERVICE_AUTH", "Authentication Service"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    uvicorn.run(app, host="0.0.0.0", port=get_env_int("PORT_SERVICE_AUTH", 8000))
