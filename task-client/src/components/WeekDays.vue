<template>
	<div class="week-days">
		<div class="week-days__item" v-for="day in weekDays" :key="day">
			{{ day }}
		</div>
	</div>
</template>

<script>
export default {
	name: "week-days",
	data() {
		return {
			weekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
		}
	}
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals" as *;
.week-days {
	display: flex;
	flex-direction: row;
	gap: 1vw;
	padding-bottom: 1vw;
	width: 100%;
	&__item {
		padding: 3vw;
		background-color: $color-nymph-hips;
		color: $color-deep-violet;
		font-weight: 700;
		font-size: 4.5vw;
		flex: 1 1 0;
	}
}
</style>