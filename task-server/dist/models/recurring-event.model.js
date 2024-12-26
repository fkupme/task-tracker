const { Model, DataTypes } = require('sequelize')

const RecurringEventModel = (sequelize) => {
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
			type: DataTypes.ARRAY(DataTypes.DATEONLY),
			defaultValue: []
		},
		general_comment: {
			type: DataTypes.STRING
		}
	}, {
		sequelize,
		modelName: 'recurring_events',
		timestamps: false
	})

	return RecurringEvent
}

module.exports = { RecurringEventModel } 