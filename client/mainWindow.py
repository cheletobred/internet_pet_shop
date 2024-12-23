import sys
from PyQt6.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QLabel, QScrollArea, QFrame,
    QPushButton, QHBoxLayout, QMessageBox, QComboBox
)
from PyQt6.QtCore import Qt


# Виджет для отображения товара
class ProductWidget(QWidget):
    def __init__(self, product_data, add_to_cart_callback):
        super().__init__()
        self.product_data = product_data
        self.add_to_cart_callback = add_to_cart_callback
        self.init_ui()

    def init_ui(self):
        layout = QHBoxLayout()
        self.setLayout(layout)

        # Отображение информации о продукте
        name_label = QLabel(f"Название: {self.product_data['name']}")
        price_label = QLabel(f"Цена: {self.product_data['price']} руб.")
        add_to_cart_btn = QPushButton("Добавить в корзину")
        add_to_cart_btn.clicked.connect(self.add_to_cart)

        layout.addWidget(name_label)
        layout.addWidget(price_label)
        layout.addWidget(add_to_cart_btn)

    def add_to_cart(self):
        self.add_to_cart_callback(self.product_data)
        QMessageBox.information(self, "Добавлено", f"{self.product_data['name']} добавлен в корзину!")


# Окно корзины
class CartWindow(QWidget):
    def __init__(self, remove_from_cart_callback):
        super().__init__()
        self.setWindowTitle("Корзина")
        self.setGeometry(200, 200, 400, 300)
        self.remove_from_cart_callback = remove_from_cart_callback

        # Основной layout
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)

        # Заголовок корзины
        self.title_label = QLabel("Корзина")
        self.title_label.setStyleSheet("font-size: 18px; font-weight: bold;")
        self.layout.addWidget(self.title_label)

        # Контейнер для списка товаров
        self.cart_container = QVBoxLayout()
        self.layout.addLayout(self.cart_container)

        # Итоговая сумма
        self.total_price_label = QLabel("Общая сумма: 0 руб.")
        self.layout.addWidget(self.total_price_label)

    def update_cart(self, cart_items):
        """Обновить содержимое корзины."""
        # Очищаем содержимое корзины
        for i in reversed(range(self.cart_container.count())):
            widget_to_remove = self.cart_container.itemAt(i).widget()
            widget_to_remove.setParent(None)

        # Добавляем товары в корзину
        total_price = 0
        for item in cart_items:
            cart_item_widget = CartItemWidget(item, self.remove_from_cart_callback)
            self.cart_container.addWidget(cart_item_widget)
            total_price += item['price'] * item['quantity']

        # Обновляем итоговую сумму
        self.total_price_label.setText(f"Общая сумма: {total_price} руб.")


# Виджет для отображения товара в корзине
class CartItemWidget(QWidget):
    def __init__(self, product_data, remove_from_cart_callback):
        super().__init__()
        self.product_data = product_data
        self.remove_from_cart_callback = remove_from_cart_callback
        self.init_ui()

    def init_ui(self):
        layout = QHBoxLayout()
        self.setLayout(layout)

        # Отображение информации о продукте
        name_label = QLabel(f"{self.product_data['name']} - {self.product_data['price']} руб. x {self.product_data['quantity']}")
        remove_btn = QPushButton("Удалить")
        remove_btn.clicked.connect(self.remove_from_cart)

        layout.addWidget(name_label)
        layout.addWidget(remove_btn)

    def remove_from_cart(self):
        self.remove_from_cart_callback(self.product_data)


# Главное окно приложения
class ShopApp(QWidget):
    def __init__(self, token):
        super().__init__()
        self.init_ui()
        self.token = token
        self.cart_items = {}  # Словарь товаров в корзине, ключ — id товара
        self.cart_window = CartWindow(self.remove_from_cart)

    def init_ui(self):
        self.setWindowTitle("Магазин")
        self.setGeometry(100, 100, 800, 600)

        # Основной вертикальный layout
        main_layout = QVBoxLayout()
        self.setLayout(main_layout)

        # Добавляем QScrollArea
        self.scroll_area = QScrollArea()
        self.scroll_area.setWidgetResizable(True)
        main_layout.addWidget(self.scroll_area)

        # Контейнер для товаров
        self.product_container = QVBoxLayout()
        container_widget = QWidget()
        container_widget.setLayout(self.product_container)
        self.scroll_area.setWidget(container_widget)

        # Выпадающий список для категорий
        self.category_combo = QComboBox()
        self.category_combo.addItem("Все категории")
        self.category_combo.addItem("Категория 1")
        self.category_combo.addItem("Категория 2")
        self.category_combo.addItem("Категория 3")
        self.category_combo.currentTextChanged.connect(self.filter_products)
        main_layout.addWidget(self.category_combo)

        # Кнопка "Открыть корзину"
        open_cart_btn = QPushButton("Открыть корзину")
        open_cart_btn.clicked.connect(self.show_cart)
        main_layout.addWidget(open_cart_btn)

        # Загрузка товаров
        self.load_products()

    def load_products(self):
        """Загружаем товары (вместо БД — список)."""
        self.all_products = [
            {"id": 1, "name": "Товар 1", "price": 100, "category": "Категория 1"},
            {"id": 2, "name": "Товар 2", "price": 200, "category": "Категория 2"},
            {"id": 3, "name": "Товар 3", "price": 300, "category": "Категория 3"},
            {"id": 4, "name": "Товар 4", "price": 150, "category": "Категория 1"},
        ]
        self.filter_products()

    def filter_products(self):
        """Фильтруем товары по выбранной категории."""
        selected_category = self.category_combo.currentText()
        filtered_products = (
            self.all_products if selected_category == "Все категории"
            else [p for p in self.all_products if p['category'] == selected_category]
        )

        # Очищаем контейнер
        for i in reversed(range(self.product_container.count())):
            widget_to_remove = self.product_container.itemAt(i).widget()
            widget_to_remove.setParent(None)

        # Добавляем отфильтрованные товары
        for product in filtered_products:
            product_widget = ProductWidget(product, self.add_to_cart)
            self.product_container.addWidget(product_widget)

    def add_to_cart(self, product_data):
        """Добавление товара в корзину."""
        product_id = product_data['id']
        if product_id in self.cart_items:
            self.cart_items[product_id]['quantity'] += 1
        else:
            self.cart_items[product_id] = {**product_data, 'quantity': 1}

    def remove_from_cart(self, product_data):
        """Удаление товара из корзины."""
        product_id = product_data['id']
        if product_id in self.cart_items:
            del self.cart_items[product_id]
        self.cart_window.update_cart(self.cart_items.values())

    def show_cart(self):
        """Показать окно корзины."""
        self.cart_window.update_cart(self.cart_items.values())
        self.cart_window.show()


# Запуск приложения
if __name__ == "__main__":
    app = QApplication(sys.argv)
    shop_app = ShopApp()
    shop_app.show()
    sys.exit(app.exec())
