const { Injectable, Inject, NotFoundException } = require('@nestjs/common')
const { User } = require('../models/user.model')
const { BaseEvent } = require('../models/base-event.model')
const { SingleEvent } = require('../models/single-event.model')
const { RecurringEvent } = require('../models/recurring-event.model')
const bcrypt = require('bcrypt')

class UsersService {
	constructor(sequelize) {
		this.sequelize = sequelize
	}

	async createUser(dto) {
		try {
			const user = await User.create({
				name: dto.name,
				email: dto.email,
				password: dto.password,
				role: dto.role || 'USER',
				dateOfBirth: dto.dateOfBirth,
				phoneNumber: dto.phoneNumber,
				avatar: dto.avatar
			})

			console.log('User created:', user.toJSON())
			return user
		} catch (error) {
			console.error('Error creating user:', error)
			throw error
		}
	}

	async getUserByEmail(email) {
		try {
			const user = await User.findOne({ where: { email } })
			console.log('Found user:', user ? user.toJSON() : null)
			return user
		} catch (error) {
			console.error('Error finding user:', error)
			throw error
		}
	}

	async getAllUsers() {
		try {
			return await User.findAll()
		} catch (error) {
			console.error('Error getting all users:', error)
			throw error
		}
	}

	async updateUser(id, userData) {
		const transaction = await this.sequelize.transaction()
		try {
			const user = await User.findByPk(id)
			if (!user) {
				throw new NotFoundException('Пользователь не найден')
			}

			// Обновляем данные пользователя
			if (userData.username) user.username = userData.username
			if (userData.email) user.email = userData.email
			if (userData.password) {
				const hashedPassword = await bcrypt.hash(userData.password, 10)
				user.password = hashedPassword
			}

			await user.save({ transaction })
			await transaction.commit()

			// Не возвращаем пароль в ответе
			const { password, ...result } = user.toJSON()
			return result
		} catch (error) {
			await transaction.rollback()
			throw error
		}
	}

	async deleteUser(id) {
		const transaction = await this.sequelize.transaction()
		try {
			const user = await User.findByPk(id)
			if (!user) {
				throw new NotFoundException('Пользователь не найден')
			}

			// Находим все базовые события пользователя
			const baseEvents = await BaseEvent.findAll({
				where: { user_id: id }
			})

			// Удаляем все связанные события
			for (const event of baseEvents) {
				await RecurringEvent.destroy({
					where: { base_event_id: event.id },
					transaction
				})

				await SingleEvent.destroy({
					where: { base_event_id: event.id },
					transaction
				})

				await event.destroy({ transaction })
			}

			// Удаляем самого пользователя
			await user.destroy({ transaction })

			await transaction.commit()
			return { message: 'Пользователь и все его данные успешно удалены' }
		} catch (error) {
			await transaction.rollback()
			throw error
		}
	}
}

Injectable()(UsersService)
Inject('SEQUELIZE')(UsersService, undefined, 0)

module.exports = { UsersService } 