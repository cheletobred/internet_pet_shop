import express from 'express'
import CategoryController from '../controllers/Category.js'

const router = new express.Router()

router.get('/getall', CategoryController.getAll)
router.get('/getone/:nameCat([0-9]+)', CategoryController.getOne)
router.post('/create', CategoryController.create)
router.put('/update/:nameCat([0-9]+)', CategoryController.update)
router.delete('/delete/:nameCat([0-9]+)', CategoryController.delete)

export default router