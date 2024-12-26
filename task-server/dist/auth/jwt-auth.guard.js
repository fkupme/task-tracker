const { Injectable, UnauthorizedException, Inject } = require('@nestjs/common')
const { JwtService } = require('@nestjs/jwt')

class JwtAuthGuard {
	constructor(jwtService) {
		this.jwtService = jwtService
	}

	canActivate(context) {
		const req = context.switchToHttp().getRequest()
		try {
			const authHeader = req.headers.authorization
			const bearer = authHeader.split(' ')[0]
			const token = authHeader.split(' ')[1]

			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
			}

			const user = this.jwtService.verify(token)
			req.user = user
			return true
		} catch (e) {
			throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
		}
	}
}

Injectable()(JwtAuthGuard)
Inject(JwtService)(JwtAuthGuard, undefined, 0)

module.exports = { JwtAuthGuard } 