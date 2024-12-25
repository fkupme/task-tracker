export const eventsModule = {
	namespaced: true,
	state: () => ({
		events: [],
		loading: false,
		error: null,
		searchData: [],
		PATH: `http://localhost:3002`,
		date: new Date().toISOString().split('T')[0]
	}),
	mutations: {
		SET_EVENTS(state, events) {
			state.events = events
		},
		SET_LOADING(state, loading) {
			state.loading = loading
		},
		SET_ERROR(state, error) {
			state.error = error
		},
		setSearchData(state, data) {
			state.searchData = data
		}
	},
	actions: {
		async updateEvent({ state, dispatch, rootState }, { id, event }) {  // деструктурируем параметры
			console.log('Updating event:', { id, event });
			
			let eventDto;
			if (event.repeat) {
					eventDto = {
							user_id: rootState.auth.user.id,
							event_name: event.task,  // было name
							start_time: event.start,
							end_time: event.end,
							repeat: event.repeat,
							week_day: event.week_day,  // было weekday
							general_comment: event.comment,
							exceptions: event.exceptions
					};
			} else {
					eventDto = {
							user_id: rootState.auth.user.id,
							event_name: event.task,  // было name
							start_time: event.start,
							end_time: event.end,
							date: event.date,
							repeat: event.repeat,
							comment: event.comment
					};
			}
	
			console.log('Event DTO:', eventDto);
			
			try {
					const response = await fetch(`${state.PATH}/events/${id}`, {  // исправил URL
							method: 'PUT',
							headers: {
									'Content-Type': 'application/json',
									'Authorization': `Bearer ${localStorage.getItem('token')}`,
							},
							body: JSON.stringify(eventDto)
					});
					
					const data = await response.json();
					await dispatch('fetchMonth', state.date);
			} catch (error) {
					console.error('Error updating event:', error);
					throw error;
			}
		},
		async deleteEvent({ state, dispatch, rootState }, id) {
			try {
				const response = await fetch(`${state.PATH}/events/${Number(id)}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			});
			await dispatch('fetchMonth', state.date);
		} catch (error) {
			console.error('Error deleting event:', error);
			throw error;
		}
		},
		async createEvent({ state, dispatch, rootState }, event) {
			let eventDto
			if (event.repeat) {
				eventDto = {
					user_id: rootState.auth.user.id,
					event_name: event.name,
					start_time: event.start,
					end_time: event.end,
					repeat: event.repeat,
					week_day: event.weekday,
					general_comment: event.comment,
					exceptions: event.exceptions
				}
			} else {
				eventDto = {
					user_id: rootState.auth.user.id,
					event_name: event.name,
					start_time: event.start,
					end_time: event.end,
					date: event.date,
					repeat: event.repeat,
					comment: event.comment
				}
			}

			try {
				const response = await fetch(`${state.PATH}/events/create`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`,
					},
					body: JSON.stringify(eventDto)
				})
				const data = await response.json()
				await dispatch('fetchMonth', state.date)
			} catch (error) {
				console.error('Error creating event:', error)
				throw error
			}
		},
		async searchEvents({ state, commit }, searchValue) {
			if (!searchValue) return
			try {
				const encodedSearch = encodeURIComponent(searchValue)

				const response = await fetch(`${state.PATH}/events/search?name=${encodedSearch}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					}
				})
				const data = await response.json()
				commit('setSearchData', data)
			} catch (error) {
				console.error('Error searching events:', error)
			}
		},
		getEventsFromCache({ commit }, date) {
			const cachedEvents = localStorage.getItem(`events_${date}`)
			if (cachedEvents) {
				commit('SET_EVENTS', JSON.parse(cachedEvents))
				return true
			}
			return false
		},

		async fetchMonth({ commit, state, dispatch }, date) {
			try {
				commit('SET_LOADING', true)

				const response = await fetch(`${state.PATH}/events/month?date=${date}`, {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${localStorage.getItem('token')}`,
						'Content-Type': 'application/json'
					}
				})

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}

				const data = await response.json()
				// Проверяем структуру данных
				if (!data || !data.weeks || !Array.isArray(data.weeks)) {
					throw new Error('Invalid data format received')
				}

				// Сохраняем весь объект с данными
				commit('SET_EVENTS', data)
				localStorage.setItem(`events_${date}`, JSON.stringify(data))
			} catch (error) {
				console.error('Error fetching events:', error)
				commit('SET_ERROR', error.message)
				commit('SET_EVENTS', [])
			} finally {
				commit('SET_LOADING', false)
			}
		}
	},
	getters: {
		getEvents: state => state.events,
		isLoading: state => state.loading,
		hasError: state => !!state.error,
		getError: state => state.error,
		month: (state) => {
			if (!state.events || !state.events.weeks) return []

			return state.events.weeks.map(week => {
				return week.map(day => {

					if (!day.events || day.events.length < 2) {
						return { ...day, overlap: false }
					}

					const sortedEvents = [...day.events]
						.filter(event => event && event.start && event.end)
						.sort((a, b) => {
							if (!a.start || !b.start) return 0

							const timeA = a.start.split(':').map(Number)
							const timeB = b.start.split(':').map(Number)
							return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1])
						})

					const overlap = sortedEvents.some((event, index) => {
						if (index === sortedEvents.length - 1) return false
						if (!event.end || !sortedEvents[index + 1].start) return false

						const current = event.end.split(':').map(Number)
						const next = sortedEvents[index + 1].start.split(':').map(Number)

						const currentEndMinutes = current[0] * 60 + current[1]
						const nextStartMinutes = next[0] * 60 + next[1]

						const hasOverlap = currentEndMinutes > nextStartMinutes
						return hasOverlap
					})

					return { ...day, overlap }
				})
			})
		}
	}
}