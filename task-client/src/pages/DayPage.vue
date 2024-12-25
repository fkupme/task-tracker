<template>
	<div class="container">
		<div class="day-page">
			<navigation-panel @prev="goToPrevDay" @next="goToNextDay" />
			<day-component :tasks="dayEvents" :date="date" :weekIndex="weekIndex" />
		</div>
	</div>
</template>

<script>
import DayComponent from "@/components/DayComponent.vue";
import NavigationPanel from "@/components/UI/NavigationPanel.vue";
import dayjs from "dayjs";
import { mapState } from "vuex";

export default {
	name: "day-page",
	components: { DayComponent, NavigationPanel },
	data() {
		return {
			date: this.$route.params.date,
			weekIndex: Number(this.$route.params.weekIndex),
		};
	},
	computed: {
		...mapState({
			month: (state) => state.events.events.weeks,
		}),
		dayEvents() {
			return (
				this.month?.[this.weekIndex]?.find(
					(day) => day.date === this.date
				)?.events
			);
		},
	},
	methods: {
		updateWeekIndex(newDate) {
			const weekIndex = this.month?.findIndex((week) =>
				week.some((day) => day.date === newDate)
			);
			return weekIndex >= 0 ? weekIndex : this.weekIndex;
		},
		goToNextDay() {
			const nextDate = dayjs(this.date).add(1, "day").format("YYYY-MM-DD");
			const nextWeekIndex = this.updateWeekIndex(nextDate);
			this.date = nextDate;
			this.weekIndex = nextWeekIndex;
			this.$router.push(`/day/${nextWeekIndex}/${nextDate}`);
		},
		goToPrevDay() {
			const prevDate = dayjs(this.date).subtract(1, "day").format("YYYY-MM-DD");
			const prevWeekIndex = this.updateWeekIndex(prevDate);
			this.date = prevDate;
			this.weekIndex = prevWeekIndex;
			this.$router.push(`/day/${prevDate}/${prevWeekIndex}`);
		},
	},
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals" as *;

</style>

