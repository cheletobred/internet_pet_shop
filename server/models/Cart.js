import { Cart as CartMapping } from './mapping.js'
import { Product as ProductMapping } from './mapping.js'
import { CartProducts as CartProductMapping } from './mapping.js'
import AppError from '../errors/AppError.js'
const { Sequelize } = require('sequelize'); 

class Basket {
    async getOne(idCart) {
        let cart = await CartMapping.findByPk(idCart, {
            attributes: ['idCart', 
                [Sequelize.literal(`(
                    SELECT SUM(p.price * cp.quantity) 
                    FROM cart_product cp 
                    JOIN products p ON cp.article = p.article 
                    WHERE cp.idCart = ${idCart}
                )`), 'totalPrice']
            ],
            include: [
                {model: ProductMapping, 
                attributes: ['article', 'name', 'price']},
            ],
        })
        if (!cart) {
            cart = await CartMapping.create()
        }
        return cart
    }

    async create() {
        const basket = await BasketMapping.create()
        return basket
    }

    async append(basketId, productId, quantity) {
        let basket = await BasketMapping.findByPk(basketId, {
            attributes: ['id'],
            include: [
                {model: ProductMapping, attributes: ['id', 'name', 'price']},
            ]
        })
        if (!basket) {
            basket = await BasketMapping.create()
        }
        // проверяем, есть ли уже этот товар в корзине
        const basket_product = await BasketProductMapping.findOne({
            where: {basketId, productId}
        })
        if (basket_product) { // есть в корзине
            await basket_product.increment('quantity', {by: quantity})
        } else { // нет в корзине
            await BasketProductMapping.create({basketId, productId, quantity})
        }
        // обновим объект корзины, чтобы вернуть свежие данные
        await basket.reload()
        return basket
    }

    async increment(basketId, productId, quantity) {
        let basket = await BasketMapping.findByPk(basketId, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!basket) {
            basket = await BasketMapping.create()
        }
        // проверяем, есть ли этот товар в корзине
        const basket_product = await BasketProductMapping.findOne({
            where: {basketId, productId}
        })
        if (basket_product) {
            await basket_product.increment('quantity', {by: quantity})
            // обновим объект корзины, чтобы вернуть свежие данные
            await basket.reload()
        }
        return basket
    }

    async decrement(basketId, productId, quantity) {
        let basket = await BasketMapping.findByPk(basketId, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!basket) {
            basket = await Basket.create()
        }
        // проверяем, есть ли этот товар в корзине
        const basket_product = await BasketProductMapping.findOne({
            where: {basketId, productId}
        })
        if (basket_product) {
            if (basket_product.quantity > quantity) {
                await basket_product.decrement('quantity', {by: quantity})
            } else {
                await basket_product.destroy()
            }
            // обновим объект корзины, чтобы вернуть свежие данные
            await basket.reload()
        }
        return basket
    }

    async remove(basketId, productId) {
        let basket = await BasketMapping.findByPk(basketId, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!basket) {
            basket = await Basket.create()
        }
        // проверяем, есть ли этот товар в корзине
        const basket_product = await BasketProductMapping.findOne({
            where: {basketId, productId}
        })
        if (basket_product) {
            await basket_product.destroy()
            // обновим объект корзины, чтобы вернуть свежие данные
            await basket.reload()
        }
        return basket
    }

    async clear(basketId) {
        let basket = await BasketMapping.findByPk(basketId, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (basket) {
            await BasketProductMapping.destroy({where: {basketId}})
            // обновим объект корзины, чтобы вернуть свежие данные
            await basket.reload()
        } else {
            basket = await Basket.create()
        }
        return basket
    }

    async delete(basketId) {
        const basket = await BasketMapping.findByPk(basketId, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!basket) {
            throw new Error('Корзина не найдена в БД')
        }
        await basket.destroy()
        return basket
    }
}

export default new Basket()