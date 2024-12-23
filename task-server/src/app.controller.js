const { Controller, Get } = require('@nestjs/common')

class AppController {
	constructor() { }

	getHello() {
		return { message: 'Hello from NestJS!' }
	}
}

// Применяем декораторы правильно
Controller('')(AppController)
Get('')(AppController.prototype, 'getHello', Object.getOwnPropertyDescriptor(AppController.prototype, 'getHello'))

module.exports = { AppController } 