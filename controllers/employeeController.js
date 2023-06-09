const PrismaClient = require('@prisma/client').PrismaClient
const prisma = new PrismaClient()

class EmployeeController {
    async getAll(req, res) {
        try {
            const employess = await prisma.emploee.findMany({
                where: {
                    userId: req.user.id
                }
            })

            res.status(200).json(employess)
        } catch {
            res.status(400).json({message: "Не удалось получить сотрудников"})
        }
    }

    async getById(req, res) {
        try {
            const {id} = req.params
            const emId = +id
            const empl = await prisma.emploee.findUnique({
                where: {
                    id: emId
                }
            })
            if(!empl) {
                return res.status(400).json({message: "Такого пользователя не существует"})
            }

            return res.status(200).json(empl)
        } catch(e) {
            return res.status(400).json({message: "Не удалось получить сотрудника"})
        }
    }

    async createEmployee(req, res) {
        try {
            const {firstName, lastName, address, age} = req.body
            if(!firstName || !lastName || !address || !age) {
                return res.status(400).json({message: "Пожалуйста, заполните обязательные поля"})
            }

            const employee = await prisma.emploee.create({
                data: {
                    firstName,
                    lastName,
                    address,
                    age,
                    userId: req.user.id
                }
            })
            res.status(201).json({employee})
        } catch {
            console.log(e)
            res.status(401).json({message: "Не удалось создать сотрудника"})
        }
    }

    async removeById(req, res) {
        try {
            const {id} = req.params

            await prisma.emploee.delete({
                where: {
                    id: +id
                }
            })

            res.status(204).json({message: "Сотрудник успешно удален"})
        } catch {
            return res.status(401).json({message: "Не удалось удалить сторудника"})
        }
    }

    async editById(req, res) {
        try {
            const {id} = req.params
            const editId = +id
            const data = req.body

            const editEmployee = await prisma.emploee.update({
                where: {
                    id: editId
                },
                data
            })

            res.status(204).json({message: "Сотрудник успешно обновлен", editEmployee})
        } catch(e) {
            return res.status(404).json({message: "Не удалось редактировать сотрудника"})
        }
    }
}

module.exports = new EmployeeController()