import { createStore } from "vuex";
import { tempModule } from './temp';
import { authModule } from './auth';
import { eventsModule } from './events';
export default createStore({
	modules: {
		temp: tempModule,
		auth: authModule,
		events: eventsModule
	}
})