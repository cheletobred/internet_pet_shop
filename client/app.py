import sys
from PyQt6.QtWidgets import (
    QApplication, QMainWindow, QWidget, QVBoxLayout, QHBoxLayout,
    QLabel, QPushButton, QMessageBox
)

from client.entire import Entire
from client.registration import Registr

class ShopApp(QWidget, Entire):
    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.registration = Registr()
        self.entire = Entire()

        self.entireBtn.clicked.connect(self.validation)
        self.registrBtn.clicked.connect(self.show_registration_form)
    def validation(self):
        try:
            QMessageBox.information(self, "Успех", "Пользователь успешно зарегистрирован!")
        except Exception as e:
            QMessageBox.critical(self, "Ошибка", str(e))   

    def show_registration_form(self):
        self.close()
        self.registration.show()      


if __name__ == '__main__':

    app = QApplication(sys.argv)
    ex = ShopApp()
    ex.show()
    sys.exit(app.exec())