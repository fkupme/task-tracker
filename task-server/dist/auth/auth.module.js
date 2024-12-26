const { Module } = require('@nestjs/common')
const { JwtModule } = require('@nestjs/jwt')
const { AuthService } = require('./auth.service')
const { AuthController } = require('./auth.controller')
const { UsersModule } = require('../users/users.module')

class AuthModule { }

const moduleDefinition = {
	imports: [
		UsersModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET || 'SECRET',
			signOptions: {
				expiresIn: '24h'
			}
		})
	],
	providers: [AuthService],
	controllers: [AuthController],
	exports: [AuthService, JwtModule]
}

Module(moduleDefinition)(AuthModule)

module.exports = { AuthModule } 