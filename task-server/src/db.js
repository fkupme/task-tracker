const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const sequelize = new Sequelize({
	dialect: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_PORT),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	logging: console.log // для отладки SQL запросов
})

// Проверка подключения
async function testConnection() {
	try {
		await sequelize.authenticate()
		console.log('Connection to database has been established successfully.')

		// Синхронизация моделей с базой данных
		await sequelize.sync({ alter: true })
		console.log('Database synchronized')
	} catch (error) {
		console.error('Unable to connect to the database:', error)
	}
}

testConnection()

module.exports = { sequelize } 