<template>
	<article class="day-wrapper">
		<div class="day">
			<div
				:style="{ 'grid-row': i }"
				class="day-time"
				v-for="i in length"
				:key="i"
			>
				{{ i + 7 }}:00
			</div>
			<task-component
				v-for="task in tasks"
				:task="task"
				:key="task.id"
				:date="date"
				:style="defineStyle(task)"
				@click.stop="handleTaskClick(task)"
			/>
		</div>
	</article>
</template>

<script>
import { mapState } from 'vuex';
import TaskComponent from "./TaskComponent.vue";

export default {
	name: "day-component",
	data() {
		return {
			length: 15,
			taskColumns: new Map(),
			maxZIndex: 2,
			taskZIndexes: new Map(),
		};
	},
	computed: {
		...mapState({
			day: (state) => state.events.events,
		}),
	},

	created() {
		this.distributeTasksToColumns();
	},

	watch: {
		tasks: {
			handler() {
				this.distributeTasksToColumns();
			},
			immediate: true,
			deep: true,
		},
	},

	components: {
		TaskComponent,
	},
	props: {
		tasks: {
			type: Array,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
	},
	methods: {
		timeToMinutes(time) {
			const [hours, minutes] = time.split(":").map(Number);
			return hours * 60 + minutes;
		},

		hasOverlap(start1, end1, start2, end2) {
			const start1Mins = this.timeToMinutes(start1);
			const end1Mins = this.timeToMinutes(end1);
			const start2Mins = this.timeToMinutes(start2);
			const end2Mins = this.timeToMinutes(end2);

			return start1Mins < end2Mins && end1Mins > start2Mins;
		},

		distributeTasksToColumns() {
			if (!this.tasks || this.tasks.length === 0) return;

			const newTaskColumns = new Map();
			const sortedTasks = [...this.tasks].sort(
				(a, b) => this.timeToMinutes(a.start) - this.timeToMinutes(b.start)
			);

			sortedTasks.forEach((currentTask) => {
				const overlappingTasks = sortedTasks.filter(
					(task) =>
						task.id !== currentTask.id &&
						newTaskColumns.has(task.id) &&
						this.hasOverlap(
							currentTask.start,
							currentTask.end,
							task.start,
							task.end
						)
				);

				if (overlappingTasks.length === 0) {
					newTaskColumns.set(currentTask.id, 2);
				} else {
					const overlappingColumns = overlappingTasks.map((task) =>
						newTaskColumns.get(task.id)
					);

					let column = 2;
					while (overlappingColumns.includes(column)) {
						column++;
					}
					newTaskColumns.set(currentTask.id, column);
				}
			});

			this.taskColumns = newTaskColumns;
		},

		getTaskBackground(taskId) {
			const hue = 36;
			const saturation = 50 + ((taskId * 7) % 30);
			const lightness = 85 + ((taskId * 5) % 10);

			return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
		},

		defineStyle(task) {
			const [startHour, startMinute] = task.start.split(":").map(Number);
			const [endHour, endMinute] = task.end.split(":").map(Number);

			const startMinutes = startHour * 60 + startMinute;
			const endMinutes = endHour * 60 + endMinute;
			const rowSpanMinutes = endMinutes - startMinutes;

			const startRow = startHour - 7;
			const topOffset = (startMinute * 100) / 60;

			const column = this.taskColumns.get(task.id);
			const backgroundColor = this.getTaskBackground(task.id);

			return {
				"grid-row":
					startRow >= 0
						? `${startRow} / span ${Math.ceil(rowSpanMinutes / 60)}`
						: "0 / span 1",
				"grid-column": column || 2,
				position: "relative",
				top: `${topOffset}%`,
				width: "calc(100% - 10px)",
				backgroundColor,
				zIndex: this.taskZIndexes.get(task.id) || 2,
			};
		},

		handleTaskClick(task) {
			this.maxZIndex++;
			this.taskZIndexes.set(task.id, this.maxZIndex);
		},
	},
};
</script>

<style lang='scss' scoped>
@use '@/assets/styles/globals' as *;

.day {
	display: grid;
	grid-template-columns: 60px repeat(5, minmax(120px, 1fr));
	row-gap: 3dvh;
	column-gap: 1px;
	justify-content: start;
	position: relative;
	&-title {
		grid-row: 1;
		grid-column: 1 / span 2;
		@include font('xl', 'bold', 'primary', 'normal');
		text-shadow: 0 0 10px get-color('border');
	}
}
</style>