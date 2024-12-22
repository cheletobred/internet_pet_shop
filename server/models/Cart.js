import { Cart as CartMapping } from './mapping.js'
import { Products as ProductMapping } from './mapping.js'
import { CartProducts as CartProductMapping } from './mapping.js'
import AppError from '../errors/AppError.js'
const { Sequelize } = require('sequelize'); 


const pretty = (cart) => {
    const data = {}
    data.idCart = cart.idCart
    data.products = []
    if (cart.products) {
        data.products = cart.products.map(item => {
            return {
                article: item.article,
                nameProduct: item.nameProduct,
                price: item.price,
                quantity: item.cart_product.quantity
            }
        })
    }
    return data
}

class Cart {
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
                attributes: ['article', 'nameProduct', 'price']},
            ],
        })
        if (!cart) {
            cart = await CartMapping.create()
        }
        return pretty(cart)
    }

    async create() {
        const cart = await CartMapping.create()
        return pretty(cart)
    }

    async append(idCart, article, quantity) {
        let cart = await CartMapping.findByPk(idCart, {
            attributes: ['idCart'],
            include: [
                {model: ProductMapping, attributes: ['article', 'nameProduct', 'price']},
            ]
        })
        if (!cart) {
            cart = await CartMapping.create()
        }
        const cart_product = await CartProductMapping.findOne({
            where: {idCart, article}
        })
        if (cart_product) { // есть в корзине
            await cart_product.increment('quantity', {by: quantity})
        } else { 
            await CartProductMapping.create({idCart, article, quantity})
        }
        await cart.reload()
        return pretty(cart)
    }

    async increment(idCart, article, quantity) {
        let cart = await CartMapping.findByPk(idCart, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!cart) {
            cart = await CartMapping.create()
        }
        // проверяем, есть ли этот товар в корзине
        const cart_product = await CartProductMapping.findOne({
            where: {idCart, article}
        })
        if (cart_product) {
            await cart_product.increment('quantity', {by: quantity})
            await cart.reload()
        }
        return pretty(cart)
    }

    async decrement(idCart, article, quantity) {
        let cart = await CartMapping.findByPk(idCart, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!cart) {
            cart = await CartMapping.create()
        }
        const cart_product = await CartProductMapping.findOne({
            where: {idCart, article}
        })
        if (cart_product) {
            if (cart_product.quantity > quantity) {
                await cart_product.decrement('quantity', {by: quantity})
            } else {
                await cart_product.destroy()
            }
            await cart.reload()
        }
        return pretty(cart)
    }

    async remove(idCart, article) {
        let cart = await CartMapping.findByPk(idCart, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!cart) {
            cart = await CartMapping.create()
        }
        const cart_product = await CartProductMapping.findOne({
            where: {idCart, article}
        })
        if (cart_product) {
            await cart_product.destroy()
            
            await cart.reload()
        }
        return pretty(cart)
    }

    async clear(idCart) {
        let cart = await CartMapping.findByPk(idCart, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (cart) {
            await CartProductMapping.destroy({where: {idCart}})
            await basket.reload()
        } else {
            cart = await Cart.create()
        }
        return pretty(cart)
    }

    async delete(idCart) {
        const cart = await CartMapping.findByPk(idCart, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!cart) {
            throw new Error('Корзина не найдена в БД')
        }
        await cart.destroy()
        return pretty(cart)
    }
}

export default new Cart()