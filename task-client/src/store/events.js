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
			localStorage.setItem('events', JSON.stringify(events))
		},
		SET_LOADING(state, loading) {
			state.loading = loading
		},
		SET_ERROR(state, error) {
			state.error = error
		},
		SET_SEARCH_DATA(state, data) {
			state.searchData = data
		},
		SET_DATE(state, date) {
			state.date = date
			localStorage.setItem('date', JSON.stringify(date))
		},
	},
	actions: {
		async updateEvent({ state, dispatch, rootState }, { id, event }) {
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
			
			try {
					const response = await fetch(`${state.PATH}/events/${id}`, {
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
				commit('SET_SEARCH_DATA', data)
			} catch (error) {
				console.error('Error searching events:', error)
			}
		},
		getEventsFromCache({ commit }) {
			const cachedEvents = JSON.parse(localStorage.getItem(`events`))
			if (cachedEvents.length > 0) {
				commit('SET_EVENTS', cachedEvents)
			}
			const cachedDate = JSON.parse(localStorage.getItem(`date`))
			if (cachedDate) {
				commit('SET_DATE', cachedDate)
			}
			return false
		},

		async fetchMonth({ commit, state, getters }, date) {
			try {
				commit('SET_LOADING', true)
				commit('SET_DATE', date)
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
				if (!data || !data.weeks || !Array.isArray(data.weeks)) {
					throw new Error('Invalid data format received')
				}

				commit('SET_EVENTS', data)
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
		getDate: state => state.date,
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
					const month = { ...day, overlap }
					if (month.length) {
						localStorage.setItem(`month`, JSON.stringify(month))
					}
					return month
				})
			})
		}
	}
}