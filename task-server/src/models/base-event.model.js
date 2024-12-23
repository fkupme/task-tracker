const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db')

class BaseEvent extends Model { }

BaseEvent.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	event_name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	start_time: {
		type: DataTypes.TIME,
		allowNull: false
	},
	end_time: {
		type: DataTypes.TIME,
		allowNull: false
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	created_at: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: sequelize.fn('NOW')
	},
	updated_at: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: sequelize.fn('NOW')
	}
}, {
	sequelize,
	modelName: 'base_event',
	tableName: 'base_events',
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	underscored: true
})

module.exports = { BaseEvent } 