<template>
	<div class="week-page">
		<div class="week-page__header">
			<div class="week-page__title">Неделя № {{ weekNumber }}</div>
			<div class="week-page__dates">{{ firstDay }} - {{ lastDay }}</div>
		</div>
		<div class="week-page__content">
			<fast-day-component
				v-for="(day, key) in days"
				:date="key"
				:day="day"
				:key="key"
				:active="true"
			/>
		</div>
	</div>
</template>

<script>
import FastDayComponent from "@/components/FastDayComponent.vue";
import { mapState } from 'vuex';

export default {
	name: "week-page",
	components: { FastDayComponent },
	computed: {
		...mapState({
			days: state => state.temp.days
		}),
		weekNumber() {
			const firstDate = new Date(Object.keys(this.days)[0]);
			return Math.ceil(firstDate.getDate() / 7);
		},
		firstDay() {
			return Object.keys(this.days)[0].split("-")[2];
		},
		lastDay() {
			const keys = Object.keys(this.days);
			return keys[keys.length - 1].split("-")[2];
		}
	}
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
		color: $color-deep-violet;
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