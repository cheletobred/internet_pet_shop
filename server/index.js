import express from 'express'
import config from 'dotenv/config'
import sequelize from './sequelize.js'
import { Cart, Category, Clients } from './models/mapping.js'
import Product from './models/Product.js'


const PORT = process.env.PORT

const app = express()

async function addClients(fio, contactInfo) {
    try {
      const clients = await Clients.create({
        fio,
        contactInfo,
      });
      console.log('Clients created:', clients.toJSON());
      addCart(0, clients.idClient)
    } catch (error) {
      console.error('Error creating clients:', error);
    }
  }

  async function addCategory(nameCat, description) {
    try {
      const category = await Category.create({
        nameCat,
        description,
      });
      console.log('Category created:', category.toJSON());
    } catch (error) {
      console.error('Error creating category:', error);
    }
  }

  async function addCart(totalPrice, idClient) {
    try {
      const cart = await Cart.create({
        totalPrice,
        idClient,
      });
      console.log('Cart created:', cart.toJSON());
    } catch (error) {
      console.error('Error creating cart:', error);
    }
  }

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: false})
        app.listen(PORT, () => console.log('Сервер запущен на порту', PORT))
        /*await addClients("Воробьева Виктория Исламовна",
          {"phone": "89000184226",
            "email": "vicka.vorobjeva2017@yandex.ru"
          })
        await addClients("Аблаутова Елена Владимировна",
            {"phone": "89654265326"
          })
        await addCategory("Собаки","Товары для собак")
        await addCategory("Кошки","Товары для кошек")
        await addCategory("Грызуны","Товары для грызунов")
        await addCategory("Птицы","Товары для птиц")
        //await addCart(0.0, 3)*/
        //await Product.addProduct(10000, 'Шапка', 'Шапка для собак', null, 800, 5, 'summer', 'Собаки')
        console.log(await Product.getOne(10000))
    } catch(e) {
        console.log(e)
    }
}
start()