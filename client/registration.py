# Form implementation generated from reading ui file 'registration.ui'
#
# Created by: PyQt6 UI code generator 6.7.1
#
# WARNING: Any manual changes made to this file will be lost when pyuic6 is
# run again.  Do not edit this file unless you know what you are doing.


from PyQt6 import QtCore, QtGui, QtWidgets
from PyQt6.QtWidgets import QWidget


class Registr(QWidget):
    def __init__(self):
        super().__init__()
        self.setupUi(self)
    def setupUi(self, Form):

        Form.setObjectName("Form")
        Form.resize(664, 475)
        self.label = QtWidgets.QLabel(parent=Form)
        self.label.setGeometry(QtCore.QRect(280, 20, 131, 51))
        font = QtGui.QFont()
        font.setPointSize(16)
        self.label.setFont(font)
        self.label.setObjectName("label")
        self.label_2 = QtWidgets.QLabel(parent=Form)
        self.label_2.setGeometry(QtCore.QRect(60, 100, 141, 17))
        self.label_2.setObjectName("label_2")
        self.label_3 = QtWidgets.QLabel(parent=Form)
        self.label_3.setGeometry(QtCore.QRect(60, 200, 141, 17))
        self.label_3.setObjectName("label_3")
        self.label_4 = QtWidgets.QLabel(parent=Form)
        self.label_4.setGeometry(QtCore.QRect(60, 300, 141, 17))
        self.label_4.setObjectName("label_4")
        self.label_5 = QtWidgets.QLabel(parent=Form)
        self.label_5.setGeometry(QtCore.QRect(490, 170, 111, 17))
        self.label_5.setObjectName("label_5")
        self.user_name = QtWidgets.QLineEdit(parent=Form)
        self.user_name.setGeometry(QtCore.QRect(50, 140, 281, 31))
        self.user_name.setObjectName("user_name")
        self.user_pass = QtWidgets.QLineEdit(parent=Form)
        self.user_pass.setGeometry(QtCore.QRect(50, 240, 281, 31))
        self.user_pass.setObjectName("user_pass")
        self.user_email = QtWidgets.QLineEdit(parent=Form)
        self.user_email.setGeometry(QtCore.QRect(50, 340, 281, 31))
        self.user_email.setObjectName("user_email")
        self.comboBox = QtWidgets.QComboBox(parent=Form)
        self.comboBox.setGeometry(QtCore.QRect(490, 210, 111, 25))
        self.comboBox.setObjectName("comboBox")
        self.comboBox.addItem("")
        self.comboBox.addItem("")
        self.registrButton = QtWidgets.QPushButton(parent=Form)
        self.registrButton.setGeometry(QtCore.QRect(450, 394, 161, 41))
        self.registrButton.setObjectName("registrButton")

        self.retranslateUi(Form)
        QtCore.QMetaObject.connectSlotsByName(Form)

    def retranslateUi(self, Form):
        _translate = QtCore.QCoreApplication.translate
        Form.setWindowTitle(_translate("Form", "Окно регистрации"))
        self.label.setText(_translate("Form", "Регистрация"))
        self.label_2.setText(_translate("Form", "Введите имя"))
        self.label_3.setText(_translate("Form", "Введите пароль"))
        self.label_4.setText(_translate("Form", "Введите почту"))
        self.label_5.setText(_translate("Form", "Выберете пол"))
        self.comboBox.setItemText(0, _translate("Form", "Мужской"))
        self.comboBox.setItemText(1, _translate("Form", "Женский"))
        self.registrButton.setText(_translate("Form", "Зарегестрироваться"))