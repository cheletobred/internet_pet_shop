import { Category as CategoryMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Category {
    async getAll() {
        const categories = await CategoryMapping.findAll()
        return categories
    }

    async getOne(nameCat) {
        const category = await CategoryMapping.findByPk(nameCat)
        if (!category) {
            throw new Error('Категория не найдена в БД')
        }
        return category
    }

    async create(data) {
        const {nameCat, description} = data
        const category = await CategoryMapping.create({nameCat, description})
        return category
    }

    async update(article, data) {
        const category = await CategoryMapping.findByPk(article)
        if (!category) {
            throw new Error('Категория не найдена в БД')
        }
        const {description = category.description} = data
        await category.update({description})
        return category
    }

    async delete(article) {
        const category = await CategoryMapping.findByPk(article)
        if (!category) {
            throw new Error('Категория не найдена в БД')
        }
        await category.destroy()
        return category
    }
}

export default new Category()