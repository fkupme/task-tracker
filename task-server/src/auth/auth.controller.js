const { Controller, Post, Body, Inject } = require('@nestjs/common')
const { AuthService } = require('./auth.service')

class AuthController {
	constructor(authService) {
		this.authService = authService
	}

	registration(userDto) {
		console.log('Registration attempt:', userDto)
		return this.authService.registration(userDto)
	}

	login(userDto) {
		console.log('Login attempt:', userDto)
		return this.authService.login(userDto)
	}
}

// Применяем декораторы правильно
Controller('auth')(AuthController)
Post('registration')(AuthController.prototype, 'registration', Object.getOwnPropertyDescriptor(AuthController.prototype, 'registration'))

Post('login')(AuthController.prototype, 'login', Object.getOwnPropertyDescriptor(AuthController.prototype, 'login'))

Body()(AuthController.prototype, 'registration', 0)
Body()(AuthController.prototype, 'login', 0)
Inject(AuthService)(AuthController, undefined, 0)

module.exports = { AuthController } 