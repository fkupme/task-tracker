const { Controller, Get, Inject, UseGuards } = require('@nestjs/common')
const { RolesGuard } = require('../auth/roles.guard')

class AdminController {
	constructor(sequelize) {
		this.sequelize = sequelize
	}

	async getTables() {
		try {
			// Получаем список всех таблиц
			const [tables] = await this.sequelize.query(`
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            `)

			// Получаем данные из каждой таблицы
			const result = {}
			for (const table of tables) {
				const [data] = await this.sequelize.query(`
                    SELECT * FROM "${table.table_name}"
                `)
				result[table.table_name] = data
			}

			return result
		} catch (error) {
			console.error('Error getting tables:', error)
			throw error
		}
	}

	async getTableStructure() {
		try {
			const [structure] = await this.sequelize.query(`
                SELECT 
                    table_name,
                    column_name,
                    data_type,
                    is_nullable
                FROM information_schema.columns 
                WHERE table_schema = 'public'
                ORDER BY table_name, ordinal_position
            `)

			// Группируем ко��онки по таблицам
			const result = {}
			structure.forEach(col => {
				if (!result[col.table_name]) {
					result[col.table_name] = []
				}
				result[col.table_name].push({
					column: col.column_name,
					type: col.data_type,
					nullable: col.is_nullable === 'YES'
				})
			})

			return result
		} catch (error) {
			console.error('Error getting table structure:', error)
			throw error
		}
	}
}

// Применяем декораторы
Controller('admin')(AdminController)
UseGuards(RolesGuard)(AdminController)
Get('tables')(AdminController.prototype, 'getTables', Object.getOwnPropertyDescriptor(AdminController.prototype, 'getTables'))
Get('structure')(AdminController.prototype, 'getTableStructure', Object.getOwnPropertyDescriptor(AdminController.prototype, 'getTableStructure'))
Inject('SEQUELIZE')(AdminController, undefined, 0)

module.exports = { AdminController } 