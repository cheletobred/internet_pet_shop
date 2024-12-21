import CartModel from '../models/Cart.js'
import ProductModel from '../models/Product.js'
import AppError from '../errors/AppError.js'

const maxAge = 60 * 60 * 1000 * 24 * 365 

class Cart {
    async getOne(req, res, next) {
        try {
            let cart
            if (req.signedCookies.idCart) {
                cart = await CartModel.getOne(parseInt(req.signedCookies.idCart))
            } else {
                cart = await CartModel.create()
            }
            res.cookie('idCart', cart.idCart, {maxAge, signed})
            res.json(cart)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async append(req, res, next) {
        try {
            let idCart
            if (!req.signedCookies.idCart) {
                let created = await CartModel.create()
                idCart = created.idCart
            } else {
                idCart = parseInt(req.signedCookies.idCart)
            }
            const {article, quantity} = req.params
            const cart = await CartModel.append(idCart, article, quantity)
            res.cookie('idCart', cart.idCart, {maxAge, signed})
            res.json(cart)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async increment(req, res, next) {
        try {
            let idCart
            if (!req.signedCookies.idCart) {
                let created = await CartModel.create()
                idCart = created.idCart
            } else {
                idCart = parseInt(req.signedCookies.idCart)
            }
            const {article, quantity} = req.params
            const cart = await CartModel.increment(idCart, article, quantity)
            res.cookie('idCart', cart.idCart, {maxAge, signed})
            res.json(cart)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async decrement(req, res, next) {
        try {
            let idCart
            if (!req.signedCookies.idCart) {
                let created = await CartModel.create()
                idCart = created.idCart
            } else {
                idCart = parseInt(req.signedCookies.idCart)
            }
            const {article, quantity} = req.params
            const cart = await CartModel.decrement(idCart, article, quantity)
            res.cookie('idCart', cart.idCart, {maxAge, signed})
            res.json(cart)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async remove(req, res, next) {
        try {
            let idCart
            if (!req.signedCookies.idCart) {
                let created = await CartModel.create()
                idCart = created.idCart
            } else {
                idCart = parseInt(req.signedCookies.idCart)
            }
            const cart = await CartModel.remove(idCart, req.params.article)
            res.cookie('idCart', cart.idCart, {maxAge, signed})
            res.json(cart)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async clear(req, res, next) {
        try {
            let idCart
            if (!req.signedCookies.idCart) {
                let created = await CartModel.create()
                idCart = created.idCart
            } else {
                idCart = parseInt(req.signedCookies.idCart)
            }
            const cart = await CartModel.clear(idCart)
            res.cookie('idCart', cart.idCart, {maxAge, signed})
            res.json(cart)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Cart()