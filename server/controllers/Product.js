import ProductModel from '../models/Product.js'
import AppError from '../errors/AppError.js'

class Product {
    async getAll(req, res, next) {
        try {
            const products = await ProductModel.getAll()
            res.json(products)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.article) {
                throw new Error('Не указан id товара')
            }
            const product = await ProductModel.getOne(req.params.article)
            console.log(req.params)
            if (!product) {
                throw new Error('Товар не найден в БД')
            }
            res.json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            
            /* const {article, name, description, volume, price, quantityStock, season, nameCat} = req.body
            const image = FileService.save(req.files?.image) ?? ''
            console.log('Информация об изображении:', image); */
            const product = await ProductModel.create(
                req.body, req.files?.image
            );
              res.json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.article) {
                throw new Error('Не указан id товара')
            }
            const product = await ProductModel.update(req.params.article, req.body, req.files?.image)
            res.json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.article) {
                throw new Error('Не указан id товара')
            }
            const product = await ProductModel.delete(req.params.article)
            res.json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Product()