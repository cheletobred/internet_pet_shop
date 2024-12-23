from fastapi import APIRouter, Depends
from psycopg import connect

from infra.dependencies import get_connection, encode_token, decode_token, get_current_user
from infra.models.user import UserCreateDTO
from server.infra.userRepo import UserRepo


user_router = APIRouter(prefix='/users', tags=['User'])


@user_router.get('/')
async def get_users(name):
    return encode_token(name)

@user_router.get('/get2')
async def get_users2(name):
    return decode_token(name)

