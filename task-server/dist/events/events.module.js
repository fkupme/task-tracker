const { Module } = require('@nestjs/common')
const { JwtModule } = require('@nestjs/jwt')
const { EventsController } = require('./events.controller')
const { EventsService } = require('./events.service')
const { BaseEvent } = require('../models/base-event.model')
const { SingleEvent } = require('../models/single-event.model')
const { RecurringEvent } = require('../models/recurring-event.model')

class EventsModule { }

const moduleDefinition = {
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET || 'SECRET',
			signOptions: {
				expiresIn: '24h'
			}
		})
	],
	controllers: [EventsController],
	providers: [
		EventsService,
		{
			provide: 'SEQUELIZE',
			useValue: require('../db').sequelize
		}
	]
}

Module(moduleDefinition)(EventsModule)

module.exports = { EventsModule } 