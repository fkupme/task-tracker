const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')
const { BaseEventModel } = require('./models/base-event.model')
const { SingleEventModel } = require('./models/single-event.model')
const { RecurringEventModel } = require('./models/recurring-event.model')

dotenv.config()

const sequelize = new Sequelize({
	dialect: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_PORT),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	logging: console.log, // для отладки SQL запросов
})

// Инициализируем модели с созданным экземпляром sequelize
const BaseEvent = BaseEventModel(sequelize);
const SingleEvent = SingleEventModel(sequelize);
const RecurringEvent = RecurringEventModel(sequelize);

// Определяем связи
BaseEvent.hasOne(SingleEvent, {
    foreignKey: 'base_event_id',
    as: 'single_event'
});
SingleEvent.belongsTo(BaseEvent, {
    foreignKey: 'base_event_id'
});

BaseEvent.hasOne(RecurringEvent, {
    foreignKey: 'base_event_id',
    as: 'recurring_event'
});
RecurringEvent.belongsTo(BaseEvent, {
    foreignKey: 'base_event_id'
});
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

module.exports = { sequelize, BaseEvent, SingleEvent, RecurringEvent } 