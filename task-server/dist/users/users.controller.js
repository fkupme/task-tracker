const { Controller, Put, Delete, Body, Param, UseGuards } = require('@nestjs/common')
const { UsersService } = require('./users.service')
const { JwtAuthGuard } = require('../auth/jwt-auth.guard')

class UsersController {
	constructor(usersService) {
		this.usersService = usersService
	}
}

Object.defineProperty(UsersController.prototype, 'updateUser', {
	value: async function (id, userData) {
		return await this.usersService.updateUser(id, userData)
	},
	writable: true,
	enumerable: true
})
Put(':id')(UsersController.prototype, 'updateUser', Object.getOwnPropertyDescriptor(UsersController.prototype, 'updateUser'))
Param('id')(UsersController.prototype, 'updateUser', 0)
Body()(UsersController.prototype, 'updateUser', 1)

Object.defineProperty(UsersController.prototype, 'deleteUser', {
	value: async function (id) {
		return await this.usersService.deleteUser(id)
	},
	writable: true,
	enumerable: true
})
Delete(':id')(UsersController.prototype, 'deleteUser', Object.getOwnPropertyDescriptor(UsersController.prototype, 'deleteUser'))
Param('id')(UsersController.prototype, 'deleteUser', 0)

Controller('users')(UsersController)
UseGuards(JwtAuthGuard)(UsersController)
Inject(UsersService)(UsersController, undefined, 0)

module.exports = { UsersController }