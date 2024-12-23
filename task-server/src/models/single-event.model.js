const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db')

class SingleEvent extends Model { }

SingleEvent.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	base_event_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false
	},
	comment: {
		type: DataTypes.STRING,
		allowNull: true
	}
}, {
	sequelize,
	modelName: 'single_event',
	tableName: 'single_events',
	timestamps: false,
	createdAt: false,
	updatedAt: false
})

module.exports = { SingleEvent } 