import jwt
from datetime import datetime, timedelta
from src.utils.env import get_env_str, get_env_int
from src.models import TokenData

# Token settings
SECRET_KEY = get_env_str("AUTH_SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = get_env_int("ACCESS_TOKEN_EXPIRE_MINUTES", 15)
REFRESH_TOKEN_EXPIRE_DAYS = get_env_int("REFRESH_TOKEN_EXPIRE_DAYS", 7)

def create_access_token(data: dict, expires_delta: timedelta = None):
    """
    Create a new JWT access token
    
    Args:
        data: Data to encode in the token
        expires_delta: Optional custom expiration time
        
    Returns:
        str: Encoded JWT access token
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict):
    """
    Create a new JWT refresh token
    
    Args:
        data: Data to encode in the token
        
    Returns:
        str: Encoded JWT refresh token
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str, token_type: str):
    """
    Verify and decode a JWT token
    
    Args:
        token: The JWT token to verify
        token_type: The expected type of token ("access" or "refresh")
        
    Returns:
        TokenData or None: Token data if valid, None otherwise
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        token_type_from_token: str = payload.get("type")
        
        if username is None or token_type_from_token != token_type:
            return None
        
        return TokenData(username=username)
    except jwt.PyJWTError:
        return None