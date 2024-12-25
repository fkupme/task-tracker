<template>
	<article
		class="fast-day"
		@click="
			push('day', {
				date: date,
				weekIndex: weekIndex,
			})
		"
		:class="{
			'fast-day_active': active,
			'fast-day_weekend': isWeekend,
			'is-not-current-month': !day.isCurrentMonth,
		}"
	>
		<div class="fast-day__header">
			<div class="fast-day__date">{{ dateParse(date) }}</div>
			<div class="fast-day__weekday">{{ getWeekDay() }}</div>
		</div>

		<div class="fast-day__content">
			<div class="fast-day__wrapper" v-if="active">
				<div
					v-for="task in day.events"
					:key="task.id"
					class="fast-day-task"
					:style="{ backgroundColor: getTaskColor(task.id) }"
				>
					<span class="fast-day-task__time">{{ task.start }}</span>
					<span class="fast-day-task__name">{{ task.task }}</span>
				</div>
			</div>
			<div class="fast-day__wrapper" v-else>
				<div class="fast-day-task-length">
					<span class="fast-day-task-length__text">задач:</span>
					<br />
					{{ day.events.length }}
				</div>
			</div>
		</div>
		<div class="fast-day__overlap" v-if="this.day.overlap"></div>
	</article>
</template>

<script>
import pushMixin from "@/mixins/pushMixin";

export default {
	name: "fast-day-component",
	mixins: [pushMixin],
	props: {
		day: {
			type: Object,
			required: true,
		},
		date: {
			type: String,
			required: true,
			default: "",
		},
		active: {
			type: Boolean,
			required: false,
		},
		weekIndex: {
			type: Number,
			required: true,
		},
	},
	computed: {
		isWeekend() {
			const date = new Date(this.date);
			return date.getDay() === 0 || date.getDay() === 6; // Проверка на выходной день (суббота или воскресенье)
		},
	},
	methods: {
		dateParse(date) {
			if (!date) return "";
			const [year, month, day] = date.split("-");
			return day;
		},
		getWeekDay() {
			const days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
			const date = new Date(this.date);
			return days[date.getDay()];
		},
		getTaskColor(taskId) {
			const hue = 36;
			const saturation = 50 + ((taskId * 7) % 30);
			const lightness = 85 + ((taskId * 5) % 10);
			return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
		},
	},
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals" as *;
@use "sass:color";

.is-not-current-month {
	opacity: 0.5;
}

.fast-day {
	aspect-ratio: 3/4;
	padding: min(1vw, 8px);
	background-color: $color-nymph-hips;
	color: $color-deep-violet;
	border-radius: 8px;
	transition: 0.3s ease-in-out;
	max-width: 100%;
	min-width: 0;
	position: relative;
	&__overlap {
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 8px;
    height: 8px;
    background: radial-gradient(circle at 40% 40%, 
        rgb(255, 0, 255) 0%, 
        rgb(181, 0, 191) 60%,
        rgb(145, 0, 153) 100% 
    );
    border-radius: 50%;
    box-shadow: 
        0 0 2px 1px rgba(181, 0, 191, 0.7),
        0 0 4px 2px rgba(181, 0, 191, 0.5),
        0 0 6px 3px rgba(181, 0, 191, 0.3);
}
	&:active {
		background-color: color.adjust($color-nymph-hips, $lightness: 5%);
		transform: translateY(-10px);
		transition: 0.3s ease-in-out;
		z-index: 100;
	}

	&_active {
		background-color: color.adjust($color-nymph-hips, $lightness: 5%);
		aspect-ratio: unset;
	}

	&_weekend {
		background-color: color.adjust($color-nymph-hips, $lightness: -5%);
	}

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: min(0.5vw, 4px);
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
		gap: min(0.5vw, 4px);
		flex: 1;
		min-height: 0;
	}

	&-task {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.3rem;
		border-radius: 4px;
		@include font("base", "regular", "primary", "normal");

		&__time {
			@include font("base", "medium");
			min-width: 45px;
		}

		&__name {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	&-task-length {
		@include font("lg", "bold", "primary", "normal");
		text-align: center;
		padding-inline: 0.1vw;

		&__text {
			@include font("xs", "regular", "primary", "normal");
		}
	}
}
</style>