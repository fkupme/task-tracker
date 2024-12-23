const { Module } = require('@nestjs/common')
const { SequelizeModule } = require('@nestjs/sequelize')
const { BaseTask } = require('../models/base-task.model')
const { SingleTask } = require('../models/single-task.model')
const { RecurringTask } = require('../models/recurring-task.model')
const { User } = require('../models/user.model')
const { TasksService } = require('./tasks.service')
const { TasksController } = require('./tasks.controller')

class TasksModule { }

const moduleDefinition = {
	imports: [
		SequelizeModule.forFeature([BaseTask, SingleTask, RecurringTask, User])
	],
	providers: [TasksService],
	controllers: [TasksController]
}

Module(moduleDefinition)(TasksModule)

module.exports = { TasksModule } 