import express from 'express'
import ProductController from '../controllers/Product.js'

const router = new express.Router()

//router.get('/getall', ProductController.getAll)
//router.get('/getall/:id([0-9]+)', ProductController.getOne)
router.get('/getall/idCategory/:idCategory([0-9]+)', ProductController.getAll)
router.get('/getall/getbyseason/:season', ProductController.getBySeason)
router.get('/getone/:article([0-9]+)', ProductController.getOne);
router.post('/create', ProductController.create)
router.put('/update/:article([0-9]+)', ProductController.update)
router.delete('/delete/:article([0-9]+)', ProductController.delete)

export default router