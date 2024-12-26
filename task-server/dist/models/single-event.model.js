const { Model, DataTypes } = require('sequelize')

const SingleEventModel = (sequelize) => {
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
			type: DataTypes.STRING
		}
	}, {
		sequelize,
		modelName: 'single_events',
		timestamps: false
	})

	return SingleEvent
}

module.exports = { SingleEventModel } 