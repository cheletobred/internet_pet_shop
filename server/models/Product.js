import { Products as ProductMapping } from "./mapping.js"
import FileService from '../services/File.js'
import AppError from '../errors/AppError.js'

class Product {
    async getAll(params) {
        const { idCategory } = params
        const where = {}
        if (idCategory) {
            where.idCategory = idCategory
        }
        const products = await ProductMapping.findAll({where})
        return products
    }

    async getOne(article) {
        const product = await ProductMapping.findByPk(article)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        return product
    }

    async create(data, img) {
        const {article, nameProduct, description, volume, size, country, age, price, quantityStock, season, idCategory} = data
        const image = FileService.save(img) ?? ''
        const product = await ProductMapping.create({
            article, nameProduct, description, volume, size, country, age, price, quantityStock, image, season, idCategory
          });
        return product
    }

    async update(article, data, img) {
        const product = await ProductMapping.findByPk(article)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        const file = FileService.save(img)
        if (file && product.image) {
            FileService.delete(product.image)
        }
        
        const {
            name = product.nameProduct,
            price = product.price,
            description = product.description,
            quantityStock = product.quantityStock,
            image = file ? file : product.image
        } = data
        await product.update({name, price, description, quantityStock, image})
        return product
    }

    async delete(article) {
        const product = await ProductMapping.findByPk(article)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        await product.destroy()
        return product
    }
/*     static async getBySeason(season) {
        const query = 'SELECT * FROM products WHERE season = ?';
        const [rows] = await db.execute(query, [season]);
        return rows;
    } */

    async getBySeason(params) {
        const { season } = params
        const where = {}
        if (season) {
            where.season = season
        }
        const products = await ProductMapping.findAll({where})
        return products
    }
    
}
export default new Product;