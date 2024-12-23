const { Injectable } = require('@nestjs/common')

class TaskService {
	constructor(sequelize) {
		this.sequelize = sequelize
	}

	findAll() {
		return 'This action returns all tasks'
	}
}

Injectable()(TaskService)

module.exports = { TaskService } 