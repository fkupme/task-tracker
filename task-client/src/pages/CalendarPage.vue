<template>
	<div class="container">
		<div class="calendar-page">
			<month-component />
		</div>
	</div>
</template>

<script>
import MonthComponent from '@/components/MonthComponent.vue'
export default {
	name: 'calendar-page',
	components: { MonthComponent }
}
</script>

<style lang="scss">
@use '@/assets/styles/globals.scss' as *;
.calendar-page{
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>

