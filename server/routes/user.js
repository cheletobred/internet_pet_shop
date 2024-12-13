import express from 'express'
import UserController from '../controllers/User.js'

const router = new express.Router()

router.post('/signup', UserController.signup)
router.post('/login', UserController.login)
router.get('/check', UserController.check)

router.get('/getall', UserController.getAll)
router.get('/getone/:idUser([0-9]+)', UserController.getOne)
router.post('/create', UserController.create)
router.put('/update/:idUser([0-9]+)', UserController.update)
router.delete('/delete/:idUser([0-9]+)', UserController.delete)

export default router