export const eventsModule = {
	state: {
		events: [],
		PATH: 'http://localhost:3002'
	},
	mutations: {
		setEvents(state, events) {
			state.events = events
		}
	},
	actions: {
		async fetchMonth({ state, commit }, date) {
			try {
				const response = await fetch(`${state.PATH}/events/month?date=${date}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`				
					}
				})
				if (!response.ok) {
					throw new Error('Failed to fetch events')
				}
				const data = await response.json()
				commit('setEvents', data)
			} catch (error) {
				console.error('Error fetching events:', error)
				throw error
			}
		}
	},
	getters: {
		events: state => state.events
	},
	namespaced: true
}