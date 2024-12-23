const { Controller, Get, Post } = require('@nestjs/common')

class TaskController {
	constructor(taskService) {
		this.taskService = taskService
	}

	findAll() {
		return 'This action returns all tasks'
	}
}

Get('')(TaskController.prototype, 'findAll', Object.getOwnPropertyDescriptor(TaskController.prototype, 'findAll'))


Controller('tasks')(TaskController)

module.exports = { TaskController } 