# Form implementation generated from reading ui file 'entire.ui'
#
# Created by: PyQt6 UI code generator 6.7.1
#
# WARNING: Any manual changes made to this file will be lost when pyuic6 is
# run again.  Do not edit this file unless you know what you are doing.


from PyQt6 import QtCore, QtGui, QtWidgets
from PyQt6.QtWidgets import QWidget, QMessageBox
import requests
from client.mainWindow import ShopApp


class Entire(QWidget):
    def __init__(self):
        super().__init__()
        self.setupUi(self)

        self.entireBtn.clicked.connect(self.auth_user)
    def setupUi(self, Form):
        Form.setObjectName("Form")
        Form.resize(717, 352)
        self.label = QtWidgets.QLabel(parent=Form)
        self.label.setGeometry(QtCore.QRect(340, 30, 61, 31))
        font = QtGui.QFont()
        font.setPointSize(16)
        self.label.setFont(font)
        self.label.setObjectName("label")
        self.label_2 = QtWidgets.QLabel(parent=Form)
        self.label_2.setGeometry(QtCore.QRect(60, 90, 171, 17))
        self.label_2.setObjectName("label_2")
        self.user_email = QtWidgets.QLineEdit(parent=Form)
        self.user_email.setGeometry(QtCore.QRect(50, 130, 271, 31))
        self.user_email.setObjectName("user_email")
        self.user_email.setText("elena@ya.ru")
        self.label_3 = QtWidgets.QLabel(parent=Form)
        self.label_3.setGeometry(QtCore.QRect(410, 90, 171, 17))
        self.label_3.setObjectName("label_3")
        self.user_pass = QtWidgets.QLineEdit(parent=Form)
        self.user_pass.setGeometry(QtCore.QRect(400, 130, 271, 31))
        self.user_pass.setObjectName("user_pass")
        self.user_pass.setText("iam`ele^w")
        self.entireBtn = QtWidgets.QPushButton(parent=Form)
        self.entireBtn.setGeometry(QtCore.QRect(260, 210, 191, 41))
        self.entireBtn.setObjectName("entireBtn")
        self.label_4 = QtWidgets.QLabel(parent=Form)
        self.label_4.setGeometry(QtCore.QRect(310, 270, 101, 17))
        self.label_4.setObjectName("label_4")
        self.registrBtn = QtWidgets.QPushButton(parent=Form)
        self.registrBtn.setGeometry(QtCore.QRect(272, 300, 171, 25))
        self.registrBtn.setAutoFillBackground(False)
        self.registrBtn.setStyleSheet("border:none;")
        self.registrBtn.setObjectName("registrBtn")

        self.retranslateUi(Form)
        QtCore.QMetaObject.connectSlotsByName(Form)

    def retranslateUi(self, Form):
        _translate = QtCore.QCoreApplication.translate
        Form.setWindowTitle(_translate("Form", "Вход"))
        self.label.setText(_translate("Form", "Вход"))
        self.label_2.setText(_translate("Form", "Введите почту"))
        self.label_3.setText(_translate("Form", "Введите пароль"))
        self.entireBtn.setText(_translate("Form", "Войти"))
        self.label_4.setText(_translate("Form", "Нет аккаунта?"))
        self.registrBtn.setText(_translate("Form", "Зарегестрироваться"))


    def auth_user(self):   
        data = {
            "email": self.user_email.text(),
            "password": self.user_pass.text()
        }
        registr_url = "http://localhost:8000/login/login"

        try:
            response = requests.post(registr_url, json=data)

            if response.status_code == 200:
                token = response.json().get('token')
                self.mainWindow = ShopApp(token=token)
                self.close()
                self.mainWindow.show()
            else:
                QMessageBox.information(self, 'Ошибка', "Неверный пароль или почта")
                print(response.text)
                
        except Exception as e:
            QMessageBox.information(self, 'Ошибка', "Некорректные данные")
            raise e    
