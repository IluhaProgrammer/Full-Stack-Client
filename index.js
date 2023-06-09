const express = require('express')
const cors = require('cors')
const cookies = require('cookie-parser')
require('dotenv').config()
const userRouter = require('./routers/userRouter.js')
const employeeRouter = require('./routers/employeeRouter.js')

const PORT = process.env.PORT | 5100

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(express.json())
app.use(cookies())

app.use('/api/user', userRouter)
app.use('/api/employee', employeeRouter)

const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server start working on port ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()