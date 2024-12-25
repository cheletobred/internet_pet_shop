import psycopg

from server.infra.models.product import Product


class ProductRepo:
    def __init__(self, conn: psycopg.Connection):
        self.conn = conn

    def get_all(self):
        query = """
        SELECT article, nameproduct, volume, size, country, age, price, quantitystock, season, idcategory
	FROM public.products;
        """
        with self.conn.cursor() as cur:
            cur.execute(query)
            items = cur.fetchall()
            for item in items:
                query = "SELECT namecategory FROM category where idcategory = %s"
                cur.execute(query, (item["idcategory"],))
                item["namecategory"] = cur.fetchone()["namecategory"]

        return [Product(**item) for item in items]

    def get_by_category(self, category_name):
        query = """
        SELECT * FROM getProductCategory(%s);
        """
        with self.conn.cursor() as cur:
            cur.execute(query,(category_name,))
            items = cur.fetchall()

        return [Product(**item) for item in items]

    def get_all_categories(self):
        query = """
        SELECT namecategory FROM category
        """
        with self.conn.cursor() as cur:
            cur.execute(query)
            items = cur.fetchall()

        return [dict(item).get('namecategory') for item in items]