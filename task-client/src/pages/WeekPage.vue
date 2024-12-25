<template>
	<div class="week-page">
		<div class="week-page__header">
			<div class="week-page__title">Неделя № {{ weekIndex + 1 }}</div>
			<div class="week-page__dates">{{ firstDay }} - {{ lastDay }}</div>
		</div>
		<div class="week-page__content">
			<fast-day-component
				v-for="(day, index) in week"
				:date="day.date"
				:day="day"
				:key="index"
				:active="true"
				:weekIndex="weekIndex"
			/>
		</div>
	</div>
</template>

<script>
import FastDayComponent from "@/components/FastDayComponent.vue";
import { mapState } from "vuex";

export default {
	name: "week-page",
	components: { FastDayComponent },
	props: {
		weekIndex: {
			type: Number,
			required: true,
			validator: (value) => {
				return Number.isInteger(value) && value >= 0;
			},
		},
	},
	computed: {
		...mapState({
			month: (state) => state.events.events.weeks,
		}),
		week() {
			return this.month[this.weekIndex] || [];
		},
		firstDay() {
			return this.week[0]?.date?.split("-")[2] || "";
		},
		lastDay() {
			return this.week[this.week.length - 1]?.date?.split("-")[2] || "";
		},
	},
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals" as *;
@use "sass:color";

.week-page {
	padding: 1rem;

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	&__title {
		@include font("m", "medium", "primary");
		color: get-color("primary");
	}

	&__dates {
		@include font("l", "regular", "primary");
		color: color.adjust($color-deep-violet, $alpha: -0.4);
	}

	&__content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
}
</style> 