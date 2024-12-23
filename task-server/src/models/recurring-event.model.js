const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db')

class RecurringEvent extends Model { }

RecurringEvent.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	base_event_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	week_day: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	exceptions: {
		type: DataTypes.ARRAY(DataTypes.DATE),
		allowNull: true
	},
	general_comment: {
		type: DataTypes.STRING,
		allowNull: true
	}
}, {
	sequelize,
	modelName: 'recurring_event',
	tableName: 'recurring_events',
	timestamps: false,
	createdAt: false,
	updatedAt: false
})

module.exports = { RecurringEvent } 