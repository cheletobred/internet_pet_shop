import express from 'express'
import cors from 'cors'
import config from 'dotenv/config'
import sequelize from './sequelize.js'
import * as mapping from './models/mapping.js'
import ErrorHandler from './middleware/ErrorHandler.js'
import fileUpload from 'express-fileupload'
import router from './routes/index.js'
import bodyParser from 'body-parser'
//import Product from './models/Product.js'


const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use(fileUpload())
app.use(express.urlencoded({ extended: true }));

app.use('/api', router)

// обработка ошибок
app.use(ErrorHandler)


app.get('/', (req, res) => {
  res.status(200).send('Hello, world!')
})

app.post('/', (req, res) => {
  res.status(200).json(req.body)
})

app.get('/api/products/seasonal', (req, res) => {
  const { season } = req.query;

  if (!season) {
      return res.status(400).json({ message: "Параметр 'season' обязателен" });
  }

  try {
    const query = 'SELECT * FROM products WHERE season = $1';
    const result = pool.query(query, [season]);
    res.json(result.rows);
    } catch (error) {
    console.error('Ошибка при запросе данных:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: false})
        app.listen(PORT, () => console.log('Сервер запущен на порту 5433'));

    } catch(e) {
        console.log(e)
    }
}

start()