import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"
import { authModule } from './auth'
import { eventsModule } from './events'

export default createStore({
	modules: {
		auth: authModule,
		events: eventsModule
	},
	plugins: [
		createPersistedState({
			paths: ['events.events'],
			storage: window.localStorage
		})
	]
})