from argon2 import PasswordHasher

ph = PasswordHasher()

def hash_password(password: str) -> str:
    return ph.hash(password)

def check_password(password: str, hashed: str) -> bool:
    try:
        ph.verify(hashed, password)
        return True
    except Exception:
        return False

if __name__ == "__main__":
    print("Password hashing and verification testing:")
    password = "my_secure_password"
    wrong_password = "wrong_password"
    hashed_password = hash_password(password)
    is_valid = check_password(password, hashed_password)
    print(f"Password is valid: {is_valid}")
    is_valid_wrong = check_password(wrong_password, hashed_password)
    print(f"Password is valid with wrong password: {is_valid_wrong}")