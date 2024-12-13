import { Users as UserMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class User {
    async getAll() {
        const users = await UserMapping.findAll()
        return users
    }

    async getOne(idUser) {
        const user = await UserMapping.findByPk(idUser)
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        return user
    }

    async create(data) {
        const {name, email, password, role} = data
        const user = await UserMapping.create({name, email, password, role})
        return user
    }

    async update(idUser, data) {
        const user = await UserMapping.findByPk(idUser)
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        const {
            name = user.name,
            email = user.email,
            password = user.password,
            role = user.role
        } = data
        await user.update({name, email, password, role})
        return user
    }

    async delete(idUser) {
        const user = await UserMapping.findByPk(idUser)
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        await user.destroy()
        return user
    }
}

export default new User()