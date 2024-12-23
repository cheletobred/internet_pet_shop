import psycopg

from server.infra.models.product import Product


class ProductRepo:
    def __init__(self, conn: psycopg.Connection):
        self.conn = conn

    def get_all(self):
        query = """
        SELECT article, nameproduct, description, volume, size, country, age, price, quantitystock, image, season, idcategory
	FROM public.products;
        """
        with self.conn.cursor() as cur:
            cur.execute(query)
            items = cur.fetchall()

        return [Product(**item) for item in items]
