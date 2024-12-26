require('reflect-metadata')
const { NestFactory } = require('@nestjs/core')
const { AppModule } = require('./app.module')
const dotenv = require('dotenv')
const net = require('net')
const { exec } = require('child_process')
const { promisify } = require('util')
const execAsync = promisify(exec)
const cors = require('cors')

dotenv.config()

// Функция для проверки доступности порта
const waitForPort = async (port, timeout = 10000) => {
	const start = Date.now()

	while (Date.now() - start < timeout) {
		try {
			const server = net.createServer()

			await new Promise((resolve, reject) => {
				server.once('error', (err) => {
					if (err.code === 'EADDRINUSE') {
						resolve(false)
					} else {
						reject(err)
					}
				})

				server.once('listening', () => {
					server.close()
					resolve(true)
				})

				server.listen(port)
			})

			return true
		} catch (err) {
			await new Promise(resolve => setTimeout(resolve, 1000))
		}
	}

	throw new Error(`Порт ${port} не освободился в течение ${timeout}ms`)
}

// Функция для убийства процесса на порту
async function killProcessOnPort(port) {
	try {
		if (process.platform === 'win32') {
			await execAsync(`FOR /F "tokens=5" %a in ('netstat -aon ^| find ":${port}" ^| find "LISTENING"') do taskkill /F /PID %a`)
		} else {
			await execAsync(`lsof -i :${port} | grep LISTEN | awk '{print $2}' | xargs kill -9`)
		}
		await new Promise(resolve => setTimeout(resolve, 1000))
	} catch (error) {
		console.log(`Процесс на порту ${port} не найден или уже остановлен`)
	}
}

async function bootstrap() {
	try {
		const port = process.env.PORT || 3002
		const maxRetries = 3
		const retryDelay = 2000

		for (let i = 0; i < maxRetries; i++) {
			try {
				const app = await NestFactory.create(AppModule)
				app.enableCors({
					origin: ['http://localhost:5173', 'http://127.0.0.1:5173',
						'https://task-tracker-rho-jet.vercel.app'
					],
					methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
					allowedHeaders: ['Content-Type', 'Authorization'],
					credentials: true,
					maxAge: 86400,
					exposedHeaders: ['Authorization']
				})

				const cleanup = async () => {
					console.log('\nЗакрываем приложение...')
					try {
						await app.close()
						console.log('Приложение успешно закрыто')
						process.exit(0)
					} catch (error) {
						console.error('Ошибка при закрытии:', error)
						process.exit(1)
					}
				}

				process.on('SIGINT', cleanup)
				process.on('SIGTERM', cleanup)
				process.on('SIGUSR2', cleanup)

				await app.listen(port)
				console.log(`Сервер запущен на порту ${port}`)
				return // Успешный запуск
			} catch (error) {
				if (error.code === 'EADDRINUSE') {
					console.log(`Попытка ${i + 1}/${maxRetries}: Порт ${port} занят, пробуем освободить...`)
					await killProcessOnPort(port)
					await new Promise(resolve => setTimeout(resolve, retryDelay))
				} else {
					throw error // Другая ошибка
				}
			}
		}

		throw new Error(`Не удалось запустить сервер после ${maxRetries} попыток`)
	} catch (error) {
		console.error('Критическая ошибка при запуске сервера:', error)
		process.exit(1)
	}
}
bootstrap()