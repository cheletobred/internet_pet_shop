import express from 'express'

import product from './product.js'
import category from './category.js'
import user from './user.js'

const router = new express.Router()

router.use('/product', product)
router.use('/category', category)
router.use('/user', user)


export default router