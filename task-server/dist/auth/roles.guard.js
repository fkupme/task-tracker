const { Injectable, CanActivate, UnauthorizedException, Inject } = require('@nestjs/common')
const { JwtService } = require('@nestjs/jwt')

class RolesGuard {
	constructor(jwtService) {
		this.jwtService = jwtService
	}

	canActivate(context) {
		const req = context.switchToHttp().getRequest()
		try {
			const authHeader = req.headers.authorization
			if (!authHeader) {
				throw new UnauthorizedException({ message: 'Не авторизован' })
			}

			const bearer = authHeader.split(' ')[0]
			const token = authHeader.split(' ')[1]

			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException({ message: 'Не авторизован' })
			}

			const user = this.jwtService.verify(token)

			if (user.role !== 'ADMIN') {
				throw new UnauthorizedException({ message: 'Нет доступа' })
			}

			req.user = user
			return true
		} catch (e) {
			throw new UnauthorizedException({ message: 'Нет дос��упа' })
		}
	}
}

Injectable()(RolesGuard)
Inject(JwtService)(RolesGuard, undefined, 0)

module.exports = { RolesGuard } 