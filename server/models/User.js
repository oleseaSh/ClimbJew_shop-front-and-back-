import { User as UserMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class User {
    async getAll() {
        const users = await UserMapping.findAll()
        return users
    }

    async getOne(id) {
        const user = await UserMapping.findByPk(id)
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        return user
    }

    async getByEmail(email) {
        const users = await UserMapping.findAll();
        const user = users[0];
        /*const user = await UserMapping.findAll({
                where: {
                    email: email
                }
            });*/
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        return user
    }


    async create(data) {
        const {email, password, role} = data
        const user = await UserMapping.create({email, password, role})
        return user
    }

    async update(id, data) {
        const user = await UserMapping.findByPk(id)
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        const {
            email = user.email,
            password = user.password,
            role = user.role
        } = data
        await user.update({email, password, role})
        return user
    }

    async delete(id) {
        const user = await UserMapping.findByPk(id)
        if (!user) {
            throw new Error('Пользователь не найден в БД')
        }
        await user.destroy()
        return user
    }
}

export default new User()