<template>
	<main>
			<div class="month">
				<week-component class="month-line" :days="days" />
				<week-component class="month-line" :days="days" />
				<week-component class="month-line" :days="days" />
				<week-component class="month-line" :days="days" />
			</div>
	</main>
</template>

<script>
import { mapState } from "vuex";
import WeekComponent from "@/components/WeekComponent.vue";
export default {
	name: "month-component",
	components: { WeekComponent },
	computed: {
		...mapState({
			days: (state) => state.temp.days,
		}),
	},
};
</script>

<style lang="scss">
.month {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	margin-top: auto;
	gap: 2dvh;
	&-line {
		flex: 1 1 1;
	}
}
</style>