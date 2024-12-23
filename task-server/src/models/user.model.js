const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../db')

class User extends Model { }

User.init({
	id: {
		type: DataTypes.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	role: {
		type: DataTypes.STRING,
		defaultValue: 'USER'
	},
	dateOfBirth: {
		type: DataTypes.DATE,
		allowNull: true
	},
	phoneNumber: {
		type: DataTypes.STRING,
		allowNull: true
	},
	avatar: {
		type: DataTypes.STRING,
		allowNull: true
	},
	banned: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	banReason: {
		type: DataTypes.STRING,
		allowNull: true
	}
}, {
	sequelize,
	modelName: 'User',
	tableName: 'users',
	timestamps: true
})

module.exports = { User } 