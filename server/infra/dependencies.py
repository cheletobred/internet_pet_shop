from psycopg import connect
from psycopg.rows import dict_row
from fastapi import HTTPException, Path, Request, Depends, Query
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated,TYPE_CHECKING
from server.infra.userRepo import UserRepo

if TYPE_CHECKING:
    from server.app import Config
import jwt



def decode_token(token):
    return jwt.decode(token, key ="secret", algorithms=['HS256'])['name']

def encode_token(token):
    return jwt.encode({"name": token}, key="secret", algorithm='HS256')


def get_current_user(token: str = Query()) -> int:
    try:
        user = int(decode_token(token))
    except Exception:
        raise HTTPException(status_code=403, detail="Invalid token")
    return user

def check_admin(request: Request, user = Depends(get_current_user)):
    conf: Config = request.app.state.config
    conn = connect(f"postgresql://{conf.db_user}:{conf.db_pass}@{conf.db_host}:{conf.db_port}/{conf.db_name}", row_factory=dict_row)
 
    user_repo = UserRepo(conn)
    user = user_repo.get_user_by_id(user)
    if user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Access denied")

def get_connection(request: Request, user = Depends(get_current_user)):
    conf: Config = request.app.state.config
    conn = connect(f"postgresql://{conf.db_user}:{conf.db_pass}@{conf.db_host}:{conf.db_port}/{conf.db_name}", row_factory=dict_row)
 
    user_repo = UserRepo(conn)
    user = user_repo.get_user_by_id(user)
    if user.role == "ADMIN":
        conn.close()
        conn = connect(f"postgresql://{conf.db_user_admin}:{conf.db_password_admin}@{conf.db_host}:{conf.db_port}/{conf.db_name}", row_factory=dict_row)
        yield conn
    else:
        yield conn
    conn.close()

def get_internal_conn(request: Request):
    conf: Config = request.app.state.config
    conn = connect(f"postgresql://{conf.db_user_admin}:{conf.db_password_admin}@{conf.db_host}:{conf.db_port}/{conf.db_name}", row_factory=dict_row)
    yield conn
    conn.close()