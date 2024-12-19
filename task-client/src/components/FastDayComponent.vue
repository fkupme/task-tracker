<template>
	<article 
		class="fast-day" 
		@click="push"
		:class="{ 
			'fast-day_active': active, 
			'fast-day__weekend': isWeekend 
		}"
	>
		<div class="fast-day__header">
			<div class="fast-day__date">{{ dateParse(date) }}</div>
			<div class="fast-day__weekday">{{ getWeekDay() }}</div>
		</div>
		
		<div class="fast-day__content">
			<div class="fast-day__wrapper" v-if="active">
				<div
					v-for="task in day"
					:key="task.id"
					class="fast-day__task"
					:style="{ backgroundColor: getTaskColor(task.id) }" 
				>
					<span class="fast-day__task-time">{{ task.start }}</span>
					<span class="fast-day__task-name">{{ task.task }}</span>
				</div>
			</div>
			<div class="fast-day__wrapper" v-else>
				<div class="fast-day__task-length">
					{{ day.length }} {{ taskWord }}
				</div>
			</div>
		</div>
	</article>
</template>

<script>
export default {
	name: "fast-day-component",
	props: {
		day: {
			type: Array,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			required: true, // Флаг активного дня
		},
	},
	computed: {
		isWeekend() {
			const date = new Date(this.date);
			return date.getDay() === 0 || date.getDay() === 6; // Проверка на выходной день (суббота или воскресенье)
		},
		taskWord() {
			// Логика для правильного склонения слова "задача" в зависимости от количества
			const lastDigit = this.day.length % 10;
			const lastTwoDigits = this.day.length % 100;

			if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return "задач";
			if (lastDigit === 1) return "задача";
			if (lastDigit >= 2 && lastDigit <= 4) return "задачи";
			return "задач";
		},
	},
	methods: {
		push() {
			setTimeout(() => {
				this.$router.push({ name: "day", params: { date: this.date } });
			}, 300);
		},
		dateParse(date) {
			return date.split("-")[2]; // Извлекаем число из даты (последний элемент после разделения по дефису)
		},
		getWeekDay() {
			const days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
			const date = new Date(this.date);
			return days[date.getDay()]; // Получаем сокращенное название дня недели
		},
		getTaskColor(taskId) {
			// Генерация уникального цвета для задачи на основе её ID
			const hue = 36; // Основной оттенок (оранжевый)
			const saturation = 50 + ((taskId * 7) % 30); // Изменение насыщенности
			const lightness = 85 + ((taskId * 5) % 10); // Изменение светлости
			return `hsl(${hue}, ${saturation}%, ${lightness}%)`; // Возвращаем цвет в формате HSL
		},
	},
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals" as *;
@use "sass:color";

.fast-day {
	aspect-ratio: 1 / 1;
	padding: 1vw;
	background-color: $color-nymph-hips;
	color: $color-deep-violet;
	border-radius: 8px;
	transition: 0.3s ease-in-out;
	&:active {
		background-color: color.adjust($color-nymph-hips, $lightness: 5%);
		transform: translateY(-10px);
		transition: 0.3s ease-in-out;
		z-index: 100;
	}

	&_active {
		background-color: color.adjust($color-nymph-hips, $lightness: 5%);
	}

	&_weekend {
		background-color: color.adjust($color-nymph-hips, $lightness: -5%);
	}

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
		flex-shrink: 0;
	}

	&__date {
		@include font("lg", "bold", "primary", "tight");
	}

	&__weekday {
		@include font("sm", "regular", "primary", "normal");
		opacity: 0.8;
	}

	&__wrapper {
		display: flex;
		flex-direction: column;
		row-gap: 2rem;
	}

	&__task {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.3rem;
		border-radius: 4px;
		@include font("base", "regular", "primary", "normal");

		&-time {
			@include font("base", "medium");
			min-width: 45px;
		}

		&-name {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	&__task-length {
		@include font("lg", "bold", "primary", "normal");
		text-align: center;
		padding: 0.5rem;
	}
}
</style>