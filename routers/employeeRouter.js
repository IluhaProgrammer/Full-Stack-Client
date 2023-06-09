const AuthMiddleware = require('../middlewares/AuthMiddleware.js').auth
const Router = require('express').Router
const Employee = require('../controllers/employeeController.js')
const router =  Router()


router.get('/all', AuthMiddleware, Employee.getAll)
router.get('/:id', AuthMiddleware, Employee.getById)
router.post('/add', AuthMiddleware, Employee.createEmployee)
router.delete('/remove/:id', AuthMiddleware, Employee.removeById)
router.put('/edit/:id', AuthMiddleware, Employee.editById)


module.exports = router
