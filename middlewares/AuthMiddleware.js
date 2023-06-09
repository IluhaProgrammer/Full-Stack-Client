const jwt = require('jsonwebtoken')
const PrismaClient = require('@prisma/client').PrismaClient
const prisma = new PrismaClient()

const auth = async (req, res, next) => {
    try {
        const  token = req.headers.authorization?.split(" ")[1]
        const secret = process.env.JWT_SERET

        const decoded = jwt.verify(token, secret)
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        })
        
        req.user = user

        next()
    } catch(e) {
        res.status(401).json({message: "Пользователь не авторизован"})
    }
}

module.exports = {
    auth
}