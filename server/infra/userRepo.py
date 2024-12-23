from fastapi import HTTPException
import psycopg
from infra.models.user import UserCreateDTO, UserReadDTO, LoginDTO


class UserRepo:
    def __init__(self, connection: psycopg.Connection):
        self.conn = connection


    def create_user(self, user: UserCreateDTO):
        """ query =
        SELECT * FROM createUser(%s,%s,%s,%s,%s)
        
        cursor = self.conn.cursor()
        try:
            cursor.execute(query, (user.name, user.email, user.sex, user.password, "USER"))
            cursor.connection.commit()
        except psycopg.errors.UniqueViolation as e:
            raise HTTPException(status_code=409, detail="Email already registered")
        cursor.close() """

        query = """
        CALL create_new_user(%s, %s, %s, %s, %s);
        """
        cursor = self.conn.cursor()
        try:
            cursor.execute("SAVEPOINT savepoint_create_user")
            
            cursor.execute(query, (user.name, user.email, user.sex, user.password, "User"))
            #cursor.connection.commit()
        except psycopg.errors.UniqueViolation:
            cursor.execute("ROLLBACK TO SAVEPOINT savepoint_create_user")
            raise Exception("Пользователь с таким email уже существует.")
        except Exception as e:
            cursor.execute("ROLLBACK TO SAVEPOINT savepoint_create_user")
            raise Exception(f"Ошибка: {str(e)}")
        else:
            cursor.execute("RELEASE SAVEPOINT savepoint_create_user")
        finally:
            cursor.close()

    def get_user_by_id(self, id):
        query = """
        SELECT * FROM users WHERE idUser = %s
        """
        cursor = self.conn.cursor()
        cursor.execute(query, (id,))
        user = cursor.fetchone()
        user = UserReadDTO(**user)
        cursor.close()
        return user
    
    def validate_user(self, data: LoginDTO):
        query = """
        SELECT * FROM users WHERE email = %s AND password = %s
        """
        cursor = self.conn.cursor()
        cursor.execute(query, (data.email, data.password))
        user = cursor.fetchone()
        cursor.close()
        return user if user else None