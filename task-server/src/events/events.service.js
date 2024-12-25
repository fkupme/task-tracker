const { Injectable, Inject, BadRequestException, NotFoundException } = require('@nestjs/common')
const { BaseEvent } = require('../models/base-event.model')
const { SingleEvent } = require('../models/single-event.model')
const { RecurringEvent } = require('../models/recurring-event.model')
const { sequelize } = require('../db')
const { Op } = require('sequelize')

class EventsService {
	constructor(sequelize) {
		this.sequelize = sequelize
	}

	/**
	 * Создание нового события
	 * POST /events/create
	 * 
	 * Для одиночного события:
	 * {
	 *   "event_name": "Встреча",
	 *   "start_time": "10:00",
	 *   "end_time": "11:00",
	 *   "repeat": false,
	 *   "date": "2024-03-15",
	 *   "comment": "Важная встреча"
	 * }
	 * 
	 * Для повторяющегося события:
	 * {
	 *   "event_name": "Планерка",
	 *   "start_time": "09:00",
	 *   "end_time": "10:00",
	 *   "repeat": true,
	 *   "week_day": 1,
	 *   "comment": "Еженедельная встреча",
	 *   "exceptions": ["2024-03-25", "2024-04-01"]
	 * }
	 */

	async createEvent(eventDto, userId) {
		const transaction = await this.sequelize.transaction()

		try {
			// Валидация обязательных полей
			if (!eventDto.event_name) {
				throw new BadRequestException('event_name обязателен')
			}
			if (!eventDto.start_time) {
				throw new BadRequestException('start_time обязателен')
			}
			if (!eventDto.end_time) {
				throw new BadRequestException('end_time обязателен')
			}

			// Создаем базовое событие
			const baseEvent = await BaseEvent.create({
				event_name: eventDto.event_name,
				start_time: eventDto.start_time,
				end_time: eventDto.end_time,
				general_comment: eventDto.general_comment,
				user_id: userId
			}, { transaction })

			// Проверяем тип события и создаем соответствующую запись
			if (eventDto.repeat) {
				if (!eventDto.week_day && eventDto.week_day !== 0) {
					throw new BadRequestException('week_day обязателен для повторяющихся событий')
				}

				await RecurringEvent.create({
					base_event_id: baseEvent.id,
					week_day: eventDto.week_day,
					exceptions: eventDto.exceptions || []
				}, { transaction })
			} else {
				if (!eventDto.date) {
					throw new BadRequestException('date обязателен для одиночных событий')
				}

				await SingleEvent.create({
					base_event_id: baseEvent.id,
					date: eventDto.date,
					comment: eventDto.comment
				}, { transaction })
			}

			await transaction.commit()
			return baseEvent

		} catch (error) {
			await transaction.rollback()
			console.error('Error creating event:', error)
			throw error
		}
	}
	/**
	 * Получение событий за месяц
	 * GET /events/month?date=2024-03
	 */
	async getMonthEvents(date, userId) {
		try {
			// Получаем первый и последний день месяца
			const startDate = new Date(date)
			startDate.setDate(1)
			const endDate = new Date(date)
			endDate.setMonth(endDate.getMonth() + 1)
			endDate.setDate(0)

			// Получаем первый понедельник
			const firstDayOfView = new Date(startDate)
			while (firstDayOfView.getDay() !== 1) {
				firstDayOfView.setDate(firstDayOfView.getDate() - 1)
			}

			// Получаем последнее воскресенье
			const lastDayOfView = new Date(endDate)
			while (lastDayOfView.getDay() !== 0) {
				lastDayOfView.setDate(lastDayOfView.getDate() + 1)
			}

			const events = await this.sequelize.query(`
				SELECT DISTINCT
						be.id,
						be.event_name as task,
						to_char(be.start_time::time, 'HH24:MI') as start,
						to_char(be.end_time::time, 'HH24:MI') as end,
						CASE 
								WHEN re.week_day = 0 THEN 'sunday'
								WHEN re.week_day = 1 THEN 'monday'
								WHEN re.week_day = 2 THEN 'tuesday'
								WHEN re.week_day = 3 THEN 'wednesday'
								WHEN re.week_day = 4 THEN 'thursday'
								WHEN re.week_day = 5 THEN 'friday'
								WHEN re.week_day = 6 THEN 'saturday'
						END as repeat,
						re.exceptions,
						re.general_comment as comment,
						se.date,
						se.comment as single_comment
				FROM base_events be
				LEFT JOIN recurring_events re ON be.id = re.base_event_id
				LEFT JOIN single_events se ON be.id = se.base_event_id
				WHERE be.user_id = :userId
						AND (
								(se.date BETWEEN :firstDay AND :lastDay)
								OR (re.id IS NOT NULL AND re.week_day IS NOT NULL)
						)
				GROUP BY
						be.id, 
						be.event_name, 
						be.start_time, 
						be.end_time,
						re.week_day,
						re.exceptions,
						re.general_comment,
						se.date,
						se.comment
		`, {
				replacements: {
						userId,
						firstDay: firstDayOfView.toISOString(),
						lastDay: lastDayOfView.toISOString()
				},
				type: this.sequelize.QueryTypes.SELECT
		});

			// Формируем массив недель
			const weeks = []
			let currentDate = new Date(firstDayOfView)
			let currentWeek = []

			while (currentDate <= lastDayOfView) {
				const dateStr = currentDate.toISOString().split('T')[0]
				const dayEvents = events.filter(event => {
					if (event.date) {
						return event.date.toISOString().split('T')[0] === dateStr
					}

					if (event.repeat) {
						const dayOfWeek = currentDate.getDay()
						const weekDayMap = {
							'sunday': 0, 'monday': 1, 'tuesday': 2,
							'wednesday': 3, 'thursday': 4, 'friday': 5, 'saturday': 6
						}
						return weekDayMap[event.repeat] === dayOfWeek &&
							(!event.exceptions || !event.exceptions.includes(dateStr))
					}

					return false
				})

				// Убираем дубликаты
				const uniqueEvents = Array.from(new Map(
					dayEvents.map(event => [event.id, event])
				).values())

				const dayData = {
					date: dateStr,
					events: uniqueEvents.map(event => ({
						id: event.id,
						task: event.task,
						start: event.start,
						end: event.end,
						repeat: event.repeat,
						comment: event.date ? event.single_comment : event.comment
					})),
					isCurrentMonth: currentDate.getMonth() === startDate.getMonth()
				}

				currentWeek.push(dayData)

				if (currentDate.getDay() === 0 || currentDate.getTime() === lastDayOfView.getTime()) {
					weeks.push([...currentWeek])
					currentWeek = []
				}

				currentDate.setDate(currentDate.getDate() + 1)
			}

			return {
				weeks,
				month: startDate.getMonth(),
				year: startDate.getFullYear()
			}
		} catch (error) {
			console.error('Error in getMonthEvents:', error)
			throw error
		}
	}
	/* Обновление события
	* PUT /events/:id
	* 
	* Для одиночного события:
	* {
	*   "event_name": "Новое название",
	*   "start_time": "11:00",
	*   "end_time": "12:00",
	*   "date": "2024-03-16",
	*   "comment": "Обновленный комментарий"
	* }
	* 
	* Для повторяющегося события:
	* {
	*   "event_name": "Новое название",
	*   "start_time": "10:00",
	*   "end_time": "11:00",
	*   "week_day": 2,
	*   "comment": "Новый комментарий",
	*   "exceptions": ["2024-03-26", "2024-04-02"]
	* }
	*/
	async updateEvent(id, eventDto) {
		const transaction = await this.sequelize.transaction()

		try {
			// Находим базовое событие
			const baseEvent = await BaseEvent.findByPk(id)
			if (!baseEvent) {
				throw new NotFoundException('Событие не найдено')
			}

			// Обновляем базовое событие
			await baseEvent.update({
				event_name: eventDto.event_name,
				start_time: eventDto.start_time,
				end_time: eventDto.end_time
			}, { transaction })

			// Проверяем тип события
			const recurringEvent = await RecurringEvent.findOne({ where: { base_event_id: id } })
			const singleEvent = await SingleEvent.findOne({ where: { base_event_id: id } })

			if (recurringEvent) {
				// Обновляем повторяющееся событие
				await recurringEvent.update({
					week_day: eventDto.week_day,
					exceptions: eventDto.exceptions,
					general_comment: eventDto.comment
				}, { transaction })
			} else if (singleEvent) {
				// Обновляем одиночное событие
				await singleEvent.update({
					date: eventDto.date,
					comment: eventDto.comment
				}, { transaction })
			}

			await transaction.commit()
			return baseEvent

		} catch (error) {
			await transaction.rollback()
			console.error('Error updating event:', error)
			throw error
		}
	}

	/**
	 * Поиск событий по названию
	 * GET /events/search?name=встреча
	 * 
	 * Query params:
	 * name - строка для поиска (например, "встреча")
	 * 
	 * Response:
	 * [
	 *   {
	 *     "id": 1,
	 *     "event_name": "Встреча с клиентом",
	 *     "start_time": "10:00",
	 *     "end_time": "11:00",
	 *     "repeat": false,
	 *     "date": "2024-03-15",
	 *     "comment": "Важная встреча"
	 *   },
	 *   {
	 *     "id": 2,
	 *     "event_name": "Еженедельная встреча команды",
	 *     "start_time": "09:00",
	 *     "end_time": "10:00",
	 *     "repeat": true,
	 *     "week_day": 1,
	 *     "comment": "Планерка",
	 *     "exceptions": ["2024-03-25"]
	 *   }
	 * ]
	 */
	async findEventsByName(name, userId) {
    try {
        const events = await this.sequelize.query(`
            SELECT 
                be.id,
                be.event_name,
                be.start_time,
                be.end_time,
                CASE 
                    WHEN re.id IS NOT NULL THEN true
                    ELSE false
                END as repeat,
                re.week_day,
                re.exceptions,
                re.general_comment as recurring_comment,
                se.date,
                se.comment as single_comment
            FROM base_events be
            LEFT JOIN recurring_events re ON be.id = re.base_event_id
            LEFT JOIN single_events se ON be.id = se.base_event_id
            WHERE LOWER(be.event_name) LIKE LOWER(:search)
            AND be.user_id = :userId
            ORDER BY be.event_name
        `, {
            replacements: {
                search: `%${name}%`,
                userId: userId
            },
            type: this.sequelize.QueryTypes.SELECT
        });

        return events.map(event => ({
            id: event.id,
            event_name: event.event_name,
            start_time: event.start_time,
            end_time: event.end_time,
            repeat: event.repeat,
            ...(event.repeat ? {
                week_day: event.week_day,
                exceptions: event.exceptions,
                comment: event.recurring_comment
            } : {
                date: event.date,
                comment: event.single_comment
            })
        }));
    } catch (error) {
        console.error('Error finding events by name:', error);
        throw error;
    }
}

	/**
	 * Получение события по ID
	 * GET /events/:id
	 * 
	 * Response для одиночного события:
	 * {
	 *   "id": 1,
	 *   "event_name": "Встреча",
	 *   "start_time": "10:00",
	 *   "end_time": "11:00",
	 *   "recurring_event": null,
	 *   "single_event": {
	 *     "date": "2024-03-15",
	 *     "comment": "Важная встреча"
	 *   }
	 * }
	 * 
	 * Response для повторяющегося события:
	 * {
	 *   "id": 2,
	 *   "event_name": "Планерка",
	 *   "start_time": "09:00",
	 *   "end_time": "10:00",
	 *   "single_event": null,
	 *   "recurring_event": {
	 *     "week_day": 1,
	 *     "general_comment": "Еженедельная встреча",
	 *     "exceptions": ["2024-03-25", "2024-04-01"]
	 *   }
	 * }
	 */
	async findEventById(id) {
		// ... существующий код ...
	}

	/**
	 * Удаление события
	 * DELETE /events/:id
	 * 
	 * Headers:
	 * {
	 *   "Authorization": "Bearer your_jwt_token"
	 * }
	 * 
	 * Response Success:
	 * {
	 *   "message": "Событие успешно удалено"
	 * }
	 * 
	 * Response Error:
	 * {
	 *   "statusCode": 404,
	 *   "message": "Событие не найдено"
	 * }
	 * или
	 * {
	 *   "statusCode": 403,
	 *   "message": "Нет прав на удаление события"
	 * }
	 */
	async deleteEvent(id, userId) {
		const transaction = await this.sequelize.transaction()
		try {
			const event = await BaseEvent.findOne({
				where: { id, user_id: userId }
			})

			if (!event) {
				throw new NotFoundException('Событие не найдено')
			}

			await RecurringEvent.destroy({
				where: { base_event_id: id },
				transaction
			})

			await SingleEvent.destroy({
				where: { base_event_id: id },
				transaction
			})

			await event.destroy({ transaction })

			await transaction.commit()
			return { message: 'Событие успешно удалено' }
		} catch (error) {
			await transaction.rollback()
			throw error
		}
	}
}

Injectable()(EventsService)
Inject('SEQUELIZE')(EventsService, undefined, 0)

module.exports = { EventsService } 