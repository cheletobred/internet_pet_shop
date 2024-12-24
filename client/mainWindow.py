import sys
from PyQt6.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QLabel, QScrollArea, QFrame,
    QPushButton, QHBoxLayout, QMessageBox, QComboBox
)
import requests
from PyQt6.QtCore import Qt

class ProductWidget(QWidget):
    def __init__(self, product_data, add_to_cart_callback):
        super().__init__()
        self.product_data = product_data
        self.add_to_cart_callback = add_to_cart_callback
        self.init_ui()

    def init_ui(self):
        layout = QVBoxLayout()
        self.setLayout(layout)

        cleaned_name = self.product_data['nameproduct'].replace('"', '')

        name_label = QLabel(f"Название: {cleaned_name}")
        size_label = QLabel(f"Размер: {self.product_data['size']}")
        country_label = QLabel(f"Страна: {self.product_data['country']}")
        age_label = QLabel(f"Возраст: {self.product_data['age']}")
        price_label = QLabel(f"Цена: {self.product_data['price']} руб.")
        add_to_cart_btn = QPushButton("Добавить в корзину")
        add_to_cart_btn.clicked.connect(self.add_to_cart)

        layout.addWidget(name_label)
        layout.addWidget(price_label)
        layout.addWidget(size_label)
        layout.addWidget(country_label)
        layout.addWidget(age_label)
        layout.addWidget(add_to_cart_btn)

    def add_to_cart(self):
        self.add_to_cart_callback(self.product_data)
        QMessageBox.information(self, "Добавлено", f"{self.product_data['nameproduct']} добавлен в корзину!")


class CartWindow(QWidget):
    def __init__(self, remove_from_cart_callback):
        super().__init__()
        self.setWindowTitle("Корзина")
        self.setGeometry(400, 400, 600, 500)
        self.remove_from_cart_callback = remove_from_cart_callback

        self.layout = QVBoxLayout()
        self.setLayout(self.layout)

        self.title_label = QLabel("Корзина")
        self.title_label.setStyleSheet("font-size: 18px; font-weight: bold;")
        self.layout.addWidget(self.title_label)

        self.cart_container = QVBoxLayout()
        self.layout.addLayout(self.cart_container)

        self.total_price_label = QLabel("Общая сумма: 0 руб.")
        self.layout.addWidget(self.total_price_label)

    def update_cart(self, token):

        cart_items_url = f"http://127.0.0.1:8000/users/cart?token={token}"
        response = requests.get(cart_items_url)
        cart_items = response.json()

        for i in reversed(range(self.cart_container.count())):
            widget_to_remove = self.cart_container.itemAt(i).widget()
            widget_to_remove.setParent(None)

        products = cart_items["Products"]
        for product in products:
            cart_item_widget = CartItemWidget(product, self.remove_from_cart_callback)
            self.cart_container.addWidget(cart_item_widget)

        total_price = cart_items["Итого"]
        self.total_price_label.setText(f"Общая сумма: {total_price}")

class CartItemWidget(QWidget):
    def __init__(self, product_data, remove_from_cart_callback):
        super().__init__()
        self.product_data = product_data
        self.remove_from_cart_callback = remove_from_cart_callback
        self.init_ui()

    def init_ui(self):
        layout = QHBoxLayout()
        self.setLayout(layout)

        name_label = QLabel(f"{self.product_data['nameproduct']} - {self.product_data['Стоимость']} руб. x {self.product_data['quantity']}")
        remove_btn = QPushButton("Удалить")
        remove_btn.clicked.connect(self.remove_from_cart)

        layout.addWidget(name_label)
        layout.addWidget(remove_btn)

    def remove_from_cart(self):
        self.remove_from_cart_callback(self.product_data)


class ShopApp(QWidget):
    def __init__(self, token):
        super().__init__()
        self.token = token
        self.categories = self.get_categories()
        self.init_ui()
        self.cart_items = {} 
        self.cart_window = CartWindow(self.remove_from_cart)

    def init_ui(self):
        self.setWindowTitle("Магазин")
        self.setGeometry(100, 100, 800, 600)

        main_layout = QVBoxLayout()
        self.setLayout(main_layout)

        self.scroll_area = QScrollArea()
        self.scroll_area.setWidgetResizable(True)
        main_layout.addWidget(self.scroll_area)

        self.product_container = QVBoxLayout()
        container_widget = QWidget()
        container_widget.setLayout(self.product_container)
        self.scroll_area.setWidget(container_widget)

        self.category_Box = QComboBox()
        self.category_Box.addItem("Все категории")
        self.category_Box.addItems(self.categories)
        self.category_Box.currentTextChanged.connect(self.filter_products)
        main_layout.addWidget(self.category_Box)

        open_cart_btn = QPushButton("Открыть корзину")
        open_cart_btn.clicked.connect(self.show_cart)
        main_layout.addWidget(open_cart_btn)

        self.load_products()

    def get_categories(self):
        categories_url = f"http://127.0.0.1:8000/product/categories?token={self.token}"
        response = requests.get(categories_url)
        data = response.json()
        print(data)
        return data

    def load_products(self):
        products_url = f"http://127.0.0.1:8000/product/?token={self.token}"
        response = requests.get(products_url)
        data = response.json()
        print(data)
        self.all_products = data
        self.filter_products()

    def filter_products(self):
        selected_category = self.category_Box.currentText()
        cart_prod_url = f"http://127.0.0.1:8000/product/products_category?category={selected_category}&token={self.token}"
        
        response = requests.get(cart_prod_url)
        data = response.json()
        filtered_products = (
            self.all_products if selected_category == "Все категории"
            else 
            data
            #[p for p in self.all_products if p['category'] == selected_category]
        )

        for i in reversed(range(self.product_container.count())):
            widget_to_remove = self.product_container.itemAt(i).widget()
            widget_to_remove.setParent(None)

        for product in filtered_products:
            product_widget = ProductWidget(product, self.add_to_cart)
            self.product_container.addWidget(product_widget)

    def add_to_cart(self, product_data):
        add_to_cart_url = f"http://127.0.0.1:8000/users/cart?article={product_data['article']}&quantity=1&token={self.token}"
        response = requests.post(add_to_cart_url)
        """ product_id = product_data['id']
        if product_id in self.cart_items:
            self.cart_items[product_id]['quantity'] += 1
        else:
            self.cart_items[product_id] = {**product_data, 'quantity': 1}
 """
    def remove_from_cart(self, product_data):
        try:
            remove_from_cart_url = f"http://127.0.0.1:8000/users/cart?article={product_data['article']}&token={self.token}"
            response = requests.delete(remove_from_cart_url)
            self.cart_window.update_cart(self.token)

        except Exception as e:
            QMessageBox.critical(self, "Ошибка", f"Не удалось удалить товар: {str(e)}")    
        """ product_id = product_data['id']
        if product_id in self.cart_items:
            del self.cart_items[product_id]
        self.cart_window.update_cart(self.cart_items.values())
 """
    def show_cart(self):
        self.cart_window.update_cart(self.token)
        self.cart_window.show()


if __name__ == "__main__":
    app = QApplication(sys.argv)
    shop_app = ShopApp()
    shop_app.show()
    sys.exit(app.exec())
