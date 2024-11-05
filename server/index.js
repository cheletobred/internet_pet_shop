import express from 'express'
import config from 'dotenv/config'
import sequelize from './sequelize.js'
import { Cart, Category, Clients } from './models/mapping.js'


const PORT = process.env.PORT

const app = express()

async function addClients(FIO_clients, contact_info) {
    try {
      const clients = await Clients.create({
        FIO_clients,
        contact_info,
      });
      console.log('Clients created:', clients.toJSON());
      addCart(0, clients.id_clients)
    } catch (error) {
      console.error('Error creating clients:', error);
    }
  }

  async function addCategory(name_category, description_category) {
    try {
      const category = await Category.create({
        name_category,
        description_category,
      });
      console.log('Category created:', category.toJSON());
    } catch (error) {
      console.error('Error creating category:', error);
    }
  }

  async function addCart(total_price_cart, id_clients) {
    try {
      const cart = await Cart.create({
        total_price_cart,
        id_clients,
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
        await addClients("Воробьева Виктория Исламовна",
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
        //await addCart(0.0, 3)
    } catch(e) {
        console.log(e)
    }
}
start()