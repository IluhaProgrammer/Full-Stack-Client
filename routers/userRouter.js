const userController = require('../controllers/userController.js')
const AuthMiddleware = require('../middlewares/AuthMiddleware.js').auth
const Router = require('express').Router
const router = Router()

router.post('/login', userController.login )
router.post('/registration', userController.registration )
router.get('/current', AuthMiddleware, userController.current )

module.exports = router