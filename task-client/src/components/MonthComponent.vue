<template>
	<main>
		<div class="month">
				<div v-if="!month">Загрузка...</div>
				<template v-else>
					<navigation-panel
						class="month-nav"
						:date="formatDate(date)"
						@prev="goToPrevMonth(date)"
						@next="goToNextMonth(date)"
					/>
					<week-component
						v-for="(week, index) in month"
						:key="index"
						class="month-line"
						:week="week"
						:weekIndex="Number(index)"
					/>
				</template>
		</div>
	</main>
</template>

<script>
import WeekComponent from "@/components/WeekComponent.vue";
import { mapGetters, mapState } from "vuex";

export default {
	name: "month-component",
	components: { WeekComponent },
	data() {
		const today = new Date();
		return {
			months: [
				"январь",
				"февраль",
				"март",
				"апрель",
				"май",
				"июнь",
				"июль",
				"август",
				"сентябрь",
				"октябрь",
				"ноябрь",
				"декабрь",
			],
		};
	},
	computed: {
		...mapGetters({
			month: "events/month",
		}),
		...mapState({
			date: (state) => state.events.date,
		}),
	},
	methods: {
		formatDate(date) {
			const [year, month, day] = date.split("-");
			return `${this.months[Number(month) - 1]} ${year}`;
		},
		goToPrevMonth(date) {
			let [year, month, day] = date.split("-");
			if (month == 1) {
				month = 12;
				year--;
			} else {
				month--;
			}
			this.$store.dispatch("events/fetchMonth", `${year}-${month.toString().padStart(2, '0')}-${day}`);
		},
		goToNextMonth(date) {
			let [year, month, day] = date.split("-");
			if (month == 12) {
				month = 1;
				year++;
			} else {
				month++;
			}
			this.$store.dispatch("events/fetchMonth", `${year}-${month.toString().padStart(2, '0')}-${day}`);
		},
		getMonth() {
			if (localStorage.events) {
				this.$store.dispatch("events/getEventsFromCache");
			} else {
				const date = new Date().toISOString().split('T')[0];
				this.$store.dispatch("events/fetchMonth", date);
			}
		},
	},
	created() {
		this.getMonth();
	},
};
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
	transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
	opacity: 0;
}
.month {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin-top: auto;
    gap: 2dvh;
	&-nav {
		margin-bottom: 0;
	}
	&-line {
		flex: 1 1 1;
		width: 100%;
	}
}
</style>