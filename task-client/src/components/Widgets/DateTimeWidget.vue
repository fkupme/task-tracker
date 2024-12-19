<template>
	<div class="date-time-widget">
		<div class="date-time-widget__time">
			<clock-bar/>
		</div>
		<div class="date-time-widget__date">
			<day-bar/>
		</div>
	</div>
</template>

<script>
import ClockBar from '@/components/ClockBar.vue'
import DayBar from '@/components/DayBar.vue'

export default {
	name: 'date-time-widget',
	components: { ClockBar, DayBar }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/globals' as *;

.date-time-widget {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	align-items: flex-end;

	&__time {
		@include font('xl', 'bold', 'mono');
	}

	&__date {
		@include font('lg', 'medium', 'mono');
	}
}
</style> 