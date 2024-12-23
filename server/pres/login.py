from fastapi import APIRouter, Depends, HTTPException
from server.infra.dependencies import encode_token, get_internal_conn
from server.infra.models.user import LoginDTO, UserCreateDTO
from server.infra.userRepo import UserRepo


login_router = APIRouter(prefix="/login", tags=["Login"])


@login_router.post("/login")
async def login(data: LoginDTO, conn=Depends(get_internal_conn)):
    user_repo = UserRepo(conn)
    user = user_repo.validate_user(data)
    if user:
        return {"token": encode_token(user["iduser"], data.password)}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")


@login_router.post("/register")
async def create_user(user: UserCreateDTO, conn=Depends(get_internal_conn)):
    user_repo = UserRepo(conn)
    user_repo.create_user(user)
    user = user_repo.get_user_by_email(user.email)
    if user:
        return {"token": encode_token(user.iduser, user.password)}
    else:
        raise HTTPException(status_code=401, detail="Error")


