<template>
	<div class="container">
		<div class="day-page">
			<day-component :tasks="day[$route.params.date]" :date="$route.params.date"/>
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
			day: state => state.temp.days
		}),
	},
}
</script>
