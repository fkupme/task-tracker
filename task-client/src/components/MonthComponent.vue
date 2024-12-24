<template>
	<main>
		<div class="month">
			<week-component
				v-for="(week, index) in month.weeks"
				:key="index"
				class="month-line"
				:days="week"
				:weekIndex="index"
			/>
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
			month: (state) => state.events.events,
		}),
	},
	beforeMount() {
		const date = new Date();
		const param = `${date.getFullYear()}-${
			date.getMonth() + 1
		}-${date.getDate()}`;
		this.$store.dispatch("events/fetchMonth", param);
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