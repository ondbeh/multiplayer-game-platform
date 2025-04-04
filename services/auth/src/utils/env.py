import os

# Retrieve env variables from secrets or environment
def get_env_str(key: str, default: str = None) -> str:
    """
    Retrieve the environment variable from the secrets or environment as a string.
    Raises ValueError if the environment variable is not found.
    """
    env = ""
    try:
        env = open(f"/run/secrets/{key}").read().strip()
    except (FileNotFoundError, IsADirectoryError, PermissionError):
        env = os.getenv(key, default)
    if env is None or env == "":
        return default
    return env

def get_env_int(key: str, default: int = None) -> int:
    """
    Retrieve the environment variable from the secrets or environment as an integer.
    Raises ValueError if the environment variable is not an integer.
    """
    env = get_env_str(key, default)
    try:
        if env is None or env == "":
            return default
        return int(env)
    except ValueError:
        raise ValueError(f"Environment variable {key} is not an integer")
    except TypeError:
        raise ValueError(f"Environment variable {key} is not a string")
    except OverflowError:
        raise ValueError(f"Environment variable {key} is too large")
    except Exception as e:
        raise ValueError(f"Environment variable {key} is not valid: {e}")