<template>
	<div class="day-bar">
		{{ formattedDate.day }}
		<br>
		{{ formattedDate.date }} {{ formattedDate.month }}
	</div>
</template>

<script>
export default {
	name: 'day-bar',
	data() {
		return {
			date: new Date()
		}
	},
	computed: {
		formattedDate() {
			const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
			const months = [
				'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
				'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
			]
			
			const day = days[this.date.getDay()]
			const date = this.date.getDate()
			const month = months[this.date.getMonth()]
			
			return {day,date, month};
		}
	},
	mounted() {
		// Обновляем дату каждый день в полночь
		const updateDate = () => {
			const now = new Date()
			const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
			const timeToMidnight = tomorrow - now

			setTimeout(() => {
				this.date = new Date()
				updateDate()
			}, timeToMidnight)
		}

		updateDate()
	}
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/globals' as *;

.day-bar {
	color: $color-nymph-hips;
	text-align: left;
	@include font('lg', 'medium', 'mono');
}
</style> 