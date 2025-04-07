from typing import Optional, List
from src.models import User, UserCreate, UserWithPassword
from src.utils.password import hash_password, check_password

users = {}

admin_user = UserWithPassword(
    id=1,
    username="admin",
    full_name="Admin User",
    email="admin@admin.ad",
    is_active=True,
    is_superuser=True,
    hashed_password=hash_password("awsaws"),
)
users[admin_user.username] = admin_user

def add_user(user: UserCreate) -> User:
    db_user = UserWithPassword(
        id=len(users) + 1,
        username=user.username,
        full_name=user.full_name,
        email=user.email,
        is_active=True,
        is_superuser=False,
        hashed_password=hash_password(user.password),
    )
    users[user.username] = db_user
    return User(
        id=db_user.id,
        username=db_user.username,
        full_name=db_user.full_name,
        email=db_user.email,
        is_active=db_user.is_active,
        is_superuser=db_user.is_superuser,
    )
    
def authenticate_user(username: str, password: str) -> Optional[User]:
    user = users.get(username)
    if user and check_password(password, user.hashed_password):
        return User(
            id=user.id,
            username=user.username,
            full_name=user.full_name,
            email=user.email,
            is_active=user.is_active,
            is_superuser=user.is_superuser,
        )
    return None
    
def get_user(username: str) -> Optional[User]:
    user = users.get(username)
    if user:
        return User(
            id=user.id,
            username=user.username,
            full_name=user.full_name,
            email=user.email,
            is_active=user.is_active,
            is_superuser=user.is_superuser,
        )
    return None

def get_user_by_id(id: int) -> Optional[User]:
    for user in users.values():
        if user.id == id:
            return User(
                id=user.id,
                username=user.username,
                full_name=user.full_name,
                email=user.email,
                is_active=user.is_active,
                is_superuser=user.is_superuser,
            )
    return None

def get_users() -> List[User]:
    return [
        User(
            id=user.id,
            username=user.username,
            full_name=user.full_name,
            email=user.email,
            is_active=user.is_active,
            is_superuser=user.is_superuser,
        )
        for user in users.values()
    ]

def delete_user(username: str) -> bool:
    if username in users:
        del users[username]
        return True
    return False

