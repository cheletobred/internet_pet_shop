import os
import dotenv
from fastapi import FastAPI
import uvicorn

from pres.user import user_router
from pres.login import login_router
from pres.product import product_router


class Config:
    def __init__(
        self,
        db_host,
        db_port,
        db_user,
        db_pass,
        db_user_admin,
        db_password_admin,
        db_name,
    ):
        self.db_host = db_host
        self.db_port = db_port
        self.db_user = db_user
        self.db_pass = db_pass
        self.db_user_admin = db_user_admin
        self.db_password_admin = db_password_admin
        self.db_name = db_name


def main():
    app = FastAPI()
    dotenv.load_dotenv(".env", override=True)
    db_host = os.environ.get("DATABASE_HOST")
    db_port = os.environ.get("DATABASE_PORT")
    db_user = os.environ.get("DATABASE_USER")
    db_pass = os.environ.get("DATABASE_PASSWORD")
    db_user_admin = os.environ.get("DATABASE_USER_ADMIN")
    db_password_admin = os.environ.get("DATABASE_PASSWORD_ADMIN")
    db_name = os.environ.get("DATABASE_NAME")
    app.state.config = Config(
        db_host, db_port, db_user, db_pass, db_user_admin, db_password_admin, db_name
    )
    app.include_router(user_router)
    app.include_router(login_router)
    app.include_router(product_router)
    return app


if __name__ == "__main__":
    app = main()
    uvicorn.run(app, host="localhost", port=8000)
