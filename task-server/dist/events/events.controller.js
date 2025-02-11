const { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req, Inject } = require('@nestjs/common')
const { EventsService } = require('./events.service')
const { JwtAuthGuard } = require('../auth/jwt-auth.guard')
const { JwtService } = require('@nestjs/jwt')
const dotenv = require('dotenv')
dotenv.config()

function getUserId(req) {
	const token = req.headers.authorization.split(' ')[1]
	return new JwtService({ secret: process.env.JWT_SECRET }).verify(token).id
}

class EventsController {
	constructor(eventsService) {
		this.eventsService = eventsService
		this.jwtService = new JwtService({ secret: process.env.JWT_SECRET })
	}
}

// Определяем методы и сразу применяем декораторы
Object.defineProperty(EventsController.prototype, 'createEvent', {
	value: async function (eventDto, req) {
		return await this.eventsService.createEvent(eventDto, getUserId(req))
	},
	writable: true,
	enumerable: true
})
Post('create')(EventsController.prototype, 'createEvent', Object.getOwnPropertyDescriptor(EventsController.prototype, 'createEvent'))
Body()(EventsController.prototype, 'createEvent', 0)
Req()(EventsController.prototype, 'createEvent', 1)

Object.defineProperty(EventsController.prototype, 'getMonthEvents', {
	value: async function (date, req) {
		try {
			return await this.eventsService.getMonthEvents(date, getUserId(req))
		} catch (error) {
			console.error('Controller error:', error)
			throw error
		}
	},
	writable: true,
	enumerable: true
})
Get('month')(EventsController.prototype, 'getMonthEvents', Object.getOwnPropertyDescriptor(EventsController.prototype, 'getMonthEvents'))
Query('date')(EventsController.prototype, 'getMonthEvents', 0)
Req()(EventsController.prototype, 'getMonthEvents', 1)

Object.defineProperty(EventsController.prototype, 'findEventsByName', {
	value: async function (name, req) {
		return await this.eventsService.findEventsByName(name, getUserId(req))
	},
	writable: true,
	enumerable: true
})
Get('search')(EventsController.prototype, 'findEventsByName', Object.getOwnPropertyDescriptor(EventsController.prototype, 'findEventsByName'))
Query('name')(EventsController.prototype, 'findEventsByName', 0)
Req()(EventsController.prototype, 'findEventsByName', 1)

Object.defineProperty(EventsController.prototype, 'findEventById', {
	value: async function (id) {
		return await this.eventsService.findEventById(id)
	},
	writable: true,
	enumerable: true
})
Get(':id')(EventsController.prototype, 'findEventById', Object.getOwnPropertyDescriptor(EventsController.prototype, 'findEventById'))
Param('id')(EventsController.prototype, 'findEventById', 0)

Object.defineProperty(EventsController.prototype, 'updateEvent', {
	value: async function (id, eventDto, req) {
		return await this.eventsService.updateEvent(id, eventDto, getUserId(req))
	},
	writable: true,
	enumerable: true
})
Put(':id')(EventsController.prototype, 'updateEvent', Object.getOwnPropertyDescriptor(EventsController.prototype, 'updateEvent'))
Param('id')(EventsController.prototype, 'updateEvent', 0)
Body()(EventsController.prototype, 'updateEvent', 1)
Req()(EventsController.prototype, 'updateEvent', 2)


Object.defineProperty(EventsController.prototype, 'deleteEvent', {
	value: async function (id, req) {

		return await this.eventsService.deleteEvent(id, getUserId(req))
	},
	writable: true,
	enumerable: true
})
Delete(':id')(EventsController.prototype, 'deleteEvent', Object.getOwnPropertyDescriptor(EventsController.prototype, 'deleteEvent'))
Param('id')(EventsController.prototype, 'deleteEvent', 0)
Req()(EventsController.prototype, 'deleteEvent', 1)

Controller('events')(EventsController)
UseGuards(JwtAuthGuard)(EventsController)
Inject(EventsService)(EventsController, undefined, 0)

module.exports = { EventsController } 