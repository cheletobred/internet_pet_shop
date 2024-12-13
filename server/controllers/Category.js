import CategoryModel from '../models/Category.js'
import AppError from '../errors/AppError.js'

class Category {
    async getAll(req, res, next) {
        try {
            const categories = await CategoryModel.getAll()
            res.json(categories)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.nameCat) {
                throw new Error('Не указан id категории')
            }
            const category = await CategoryModel.getOne(req.params.nameCat)
            res.json(category)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const product = await CategoryModel.create(req.body);
              res.json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.nameCat) {
                throw new Error('Не указан id категории')
            }
            const category = await CategoryModel.update(req.params.nameCat, req.body)
            res.json(category)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.nameCat) {
                throw new Error('Не указан id категории')
            }
            const category = await CategoryModel.delete(req.params.nameCat)
            res.json(category)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Category()