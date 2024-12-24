const { Injectable, UnauthorizedException, BadRequestException, Inject } = require('@nestjs/common')
const { JwtService } = require('@nestjs/jwt')
const { UsersService } = require('../users/users.service')
const bcrypt = require('bcryptjs')

class AuthService {
	constructor(
		usersService,
		jwtService
	) {
		this.usersService = usersService
		this.jwtService = jwtService
	}

	async login(userDto) {
		const user = await this.validateUser(userDto)
		return this.generateToken(user)
	}

	async validateUser(userDto) {
		const user = await this.usersService.getUserByEmail(userDto.email)
		if (!user) {
			throw new UnauthorizedException({ message: 'Некорректный email' })
		}
		const passwordEquals = await bcrypt.compare(userDto.password, user.password)
		if (!passwordEquals) {
			throw new UnauthorizedException({ message: 'Некорректный пароль' })
		}
		return user
	}

	async generateToken(user) {
		const payload = {
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
			dateOfBirth: user.dateOfBirth,
			phoneNumber: user.phoneNumber,
			avatar: user.avatar,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		}

		return {
			token: this.jwtService.sign(payload)
		}
	}

	async registration(userDto) {
		try {
			console.log('Registration service started with:', userDto)

			if (!userDto.name) {
				console.log(userDto.name)
				throw new BadRequestException('Имя пользователя обязательно')
			}

			const candidate = await this.usersService.getUserByEmail(userDto.email)

			if (candidate) {
				throw new BadRequestException('Пользователь с таким email уже существует')
			}

			const hashPassword = await bcrypt.hash(userDto.password, 5)

			const user = await this.usersService.createUser({
				...userDto,
				password: hashPassword
			})

			return this.generateToken(user)
		} catch (error) {
			throw error
		}
	}
}

Injectable()(AuthService)
Inject(UsersService)(AuthService, undefined, 0)
Inject(JwtService)(AuthService, undefined, 1)

module.exports = { AuthService } 