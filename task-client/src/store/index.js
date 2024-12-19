import { createStore } from "vuex";
import { tempModule } from './temp';

export default createStore({
	modules: {
		temp: tempModule,
	}
})
