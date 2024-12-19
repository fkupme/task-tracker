<template>
	<div class="day-page">
		<day-component :tasks="day[$route.params.date]" :data="data"/>
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
