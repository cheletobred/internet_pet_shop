from fastapi import HTTPException
import psycopg
from infra.models.user import UserCreateDTO, UserReadDTO, LoginDTO
from server.infra.models.product import Cart, ProductInCart


class UserRepo:
    def __init__(self, connection: psycopg.Connection):
        self.conn = connection

    def create_user(self, user: UserCreateDTO):
        query = """
        CALL create_new_user(%s, %s, %s, %s, %s);
        """
        cursor = self.conn.cursor()
        try:
            cursor.execute("SAVEPOINT savepoint_create_user")

            cursor.execute(
                query, (user.name, user.email, user.sex, user.password, "User")
            )
        except psycopg.errors.RaiseException:
            cursor.execute("ROLLBACK TO SAVEPOINT savepoint_create_user")
            raise HTTPException(
                status_code=409,
                detail="Пользователь с таким email или login уже существует.",
            )
        except Exception as e:
            cursor.execute("ROLLBACK TO SAVEPOINT savepoint_create_user")
            raise e
        else:
            cursor.execute("RELEASE SAVEPOINT savepoint_create_user")
        finally:
            cursor.connection.commit()
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
        SELECT * FROM autorizarion(%s, %s)
        """
        cursor = self.conn.cursor()
        cursor.execute(query, (data.email, data.password))
        check = cursor.fetchone()
        cursor.close()
        if not check:
            return

        query = """
        SELECT iduser FROM users WHERE email = %s
        """

        cursor = self.conn.cursor()
        cursor.execute(query, (data.email,))
        user = cursor.fetchone()
        cursor.close()
        if not user:
            return
        return user

    def get_cart(self):
        query = """
        SELECT * FROM cart_user
        """
        cursor = self.conn.cursor()
        cursor.execute(query)
        items = cursor.fetchall()
        items = Cart(
            Products=[ProductInCart(**item) for item in items], Итого=items[0]["Итого"]
        )
        cursor.close()
        return items

    def add_to_cart(self, article: int, quantity: int):
        query = """
        SELECT * FROM add_product_cart(%s, %s)
"""

        with self.conn.cursor() as cur:
            cur.execute(query, (article, quantity))
            cur.execute("SELECT current_user")
            print(cur.fetchone())
            cur.connection.commit()

    def remove_from_cart(self, article: int):
        query = """
        DELETE FROM cart_product WHERE idcart = (SELECT idcart FROM users INNER JOIN cart USING(iduser)
	WHERE name=current_user) AND article = %s;

"""

        with self.conn.cursor() as cur:
            cur.execute(query, (article,))
            cur.execute("SELECT current_user")
            print(cur.fetchone())
            cur.connection.commit()
