<template>
	<div class="search-item">
		<h3>{{ searchItem.event_name }}</h3>
		<p>
			{{ formattedTime(searchItem.start_time) }} -
			{{ formattedTime(searchItem.end_time) }}
		</p>
		<p v-if="searchItem.comment">{{ searchItem.comment }}</p>
		<p v-if="searchItem.exceptions && searchItem.exceptions.length">
			Исключения: {{ searchItem.exceptions.join(", ") }}
		</p>
		<p>{{ searchItem.repeat ? "Повторяется" : "Не повторяется" }}: {{ formatWeekDay(searchItem.week_day) }} </p>
		<p v-if="searchItem.date">
			Дата: {{ formattedDate(searchItem.date) }}
		</p>
	</div>
</template>

<script>
export default {
	name: "search-item",
	props: {
		searchItem: {
			type: Object,
			required: true,
		},
	},
	methods: {
		formattedDate(date) {
			if (!date) return "";
			return date.split("-").reverse().join(".");
		},
		formattedTime(time) {
			if (!time) return "";
			return time.split(":").slice(0, 2).join(":");
		},
		formatWeekDay(day) {
			const days = [
				"Воскресенье",
				"Понедельник",
				"Вторник",
				"Среда",
				"Четверг",
				"Пятница",
				"Суббота",
			];
			return days[day] || "";
		},
	},
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals" as *;

.search-item {
	padding: 15px;
	margin-bottom: 10px;
	border-radius: 8px;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	h3 {
		margin: 0 0 10px;
		color: #333;
	}

	p {
		margin: 5px 0;
		color: #666;
	}
}
</style>