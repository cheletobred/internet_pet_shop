import UserModel from '../models/User.js'
import AppError from '../errors/AppError.js'

class User {
    async signup(req, res) {
        res.status(200).send('Регистрация пользователя')
    }

    async login(req, res) {
        res.status(200).send('Вход в личный кабинет')
    }

    async check(req, res) {
        res.status(200).send('Проверка авторизации')
    }

    async getAll(req, res, next) {
        try {
            const users = await UserModel.getAll()
            res.json(users)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.idUser) {
                throw new Error('Не указан id пользователя')
            }
            const user = await UserModel.getOne(req.params.idUser)
            res.json(user)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const user = await UserModel.create(req.body)
            res.json(brand)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.idUser) {
                throw new Error('Не указан id пользователя')
            }
            const user = await UserModel.update(req.params.idUser, req.body)
            res.json(user)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.idUser) {
                throw new Error('Не указан id пользователя')
            }
            const user = await UserModel.delete(req.params.idUser)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new User()