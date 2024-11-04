import express from 'express'
import config from 'dotenv/config'
import sequelize from './sequelize.js'
import { Cart } from './models/mapping.js'


const PORT = process.env.PORT

const app = express()

async function createCart(name, price, description) {
    try {
      const product = await Cart.create({
        name,
        price,
        description,
      });
      console.log('Product created:', product.toJSON());
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }

  async function main() {
    await sequelize.sync({force: false}); // Синхронизация моделей с базой данных
    await createCart(20, 1.00, 20);
  }
  
  main();

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: false})
        app.listen(PORT, () => console.log('Сервер запущен на порту', PORT))
    } catch(e) {
        console.log(e)
    }
}


start()