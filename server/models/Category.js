import { Category as CategoryMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Category {
    async getAll() {
        const categories = await CategoryMapping.findAll()
        return categories
    }

    async getOne(idCategory) {
        const category = await CategoryMapping.findByPk(idCategory)
        if (!category) {
            throw new Error('Категория не найдена в БД')
        }
        return category
    }

    async create(data) {
        const {nameCategory, description} = data
        const category = await CategoryMapping.create({nameCategory, description})
        return category
    }

    async update(idCategory, data) {
        const category = await CategoryMapping.findByPk(idCategory)
        if (!category) {
            throw new Error('Категория не найдена в БД')
        }
        const {name = category.nameCategory, description = category.description} = data
        await category.update({name, description})
        return category
    }

    async delete(idCategory) {
        const category = await CategoryMapping.findByPk(idCategory)
        if (!category) {
            throw new Error('Категория не найдена в БД')
        }
        await category.destroy()
        return category
    }
}

export default new Category()