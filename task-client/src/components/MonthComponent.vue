<template>
	<main>
		<div class="month">
			<div v-if="!month">Загрузка...</div>
			<template v-else>
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
import { mapState, mapGetters } from "vuex";

export default {
	name: "month-component",
	components: { WeekComponent },
	computed: {
		...mapGetters({
			month: "events/month",
		}),
	},
	created() {
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