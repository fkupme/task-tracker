const { Module } = require('@nestjs/common')
const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')
const { AuthController } = require('./auth/auth.controller')
const { AuthService } = require('./auth/auth.service')
const { UsersService } = require('./users/users.service')
const { JwtModule } = require('@nestjs/jwt')
const { AppController } = require('./app.controller')
const { EventsModule } = require('./events/events.module')
const { AdminController } = require('./admin/admin.controller')

dotenv.config()

const sequelize = new Sequelize({
	dialect: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_PORT),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
})

// Инициализируем модели
require('./models/user.model')
require('./models/base-event.model')
require('./models/single-event.model')
require('./models/recurring-event.model')

// Синхронизируем модели с базой данных
sequelize.sync({ alter: true }).then(() => {
	console.log('Database synchronized')
}).catch(err => {
	console.error('Error synchronizing database:', err)
})

class AppModule { }

const moduleDefinition = {
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET || 'SECRET',
			signOptions: {
				expiresIn: '24h'
			}
		}),
		EventsModule
	],
	controllers: [AppController, AuthController, AdminController],
	providers: [
		{
			provide: 'SEQUELIZE',
			useValue: sequelize
		},
		AuthService,
		UsersService
	]
}

Module(moduleDefinition)(AppModule)

module.exports = { AppModule }