<template>
	<div class="container">
		<div class="day-page">
			<day-component
				:tasks="dayEvents"
				:date="$route.params.date"
				:weekIndex="$route.params.weekIndex"
			/>
		</div>
	</div>
</template>

<script>
import DayComponent from '@/components/DayComponent.vue';
import { mapState } from 'vuex';

export default {
	name: 'day-page',
	components: { DayComponent },
	computed: {
		...mapState({
			month: state => state.events.events
		}),
		dayEvents() {
			const weekIndex = Number(this.$route.params.weekIndex);
			const date = this.$route.params.date;
			return this.month.weeks?.[weekIndex]?.find(day => day.date === date)?.events || [];
		}
	}
}
</script>
