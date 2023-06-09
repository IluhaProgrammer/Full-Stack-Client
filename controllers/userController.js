const PrismaClient = require('@prisma/client').PrismaClient
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
    // api user POST login user
    async login(req, res) {
        try {
          const {email, password} = req.body
            if(!email || !password) {
                return res.status(400).json({message: "Пожалуйста, заполните обязательные поля"})
            }

            const user = await prisma.user.findFirst({
                where: {
                    email
                }
            })
            const isPassword = user && (await bcrypt.compare(password, user.password))
            const secret = process.env.JWT_SERET
            if(user && isPassword && secret) {
                res.status(200).json({
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    token: jwt.sign({id: user.id, email: user.email}, secret, {expiresIn: "30d"})
                }) 
            } else {
                return res.status(400).json({message: "Невеный логин или пароль"})
            }  
        } catch{
            res.status(400).json({message: "Упс, что-то пошло не так"})
        }
            

    }
    //Api user POST registartion user
    async registration(req, res) {
        try {
           const {email, name, password} = req.body
            if(!email || !name || !password) {
                return res.status(400).json({message: "Пожалуйста ,заполните все обязательные поля"})
            } 

            const registeredUser = await prisma.user.findFirst({
                where: {
                    email
                }
            })
            if(registeredUser) {
                return res.status(400).json({message: "Пользователь с таким email уже существует"})
            }
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)

            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashPassword
                }
            })
            const secret = process.env.JWT_SERET
            if(user && secret) {
                res.status(201).json({user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    token: jwt.sign({id: user.id, email: user.email}, secret, {expiresIn: "30d"} )
                }})
            } else {
                return res.status(400).json({message: "Не удалось создать пользователя"})
            } 
        } catch{
            res.status(401).json({message: "Упс, что-то пошло не так"})
        }
            

    }
// api user GET current user
    async current(req, res) {
        try {
            return res.status(200).json(req.user)
        } catch {
            res.status(400).json({message: "Упс, что-то пошло не так"})
        }
        
    }
}

module.exports = new UserController()