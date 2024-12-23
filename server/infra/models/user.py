from typing import Literal
from pydantic import BaseModel


class UserCreateDTO(BaseModel):
    name: str
    email: str
    sex: Literal["Men", "Women"]
    password: str


class UserReadDTO(UserCreateDTO):
    iduser: int
    role: Literal["User", "Admin"]


class LoginDTO(BaseModel):
    email: str
    password: str
