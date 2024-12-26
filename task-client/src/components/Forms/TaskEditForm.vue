<template>
	<form class="task-form" @submit.prevent="handleSubmit">
		<h3 class="task-form__title">Редактировать задачу</h3>
		<my-field
			v-model="form.name"
			label="Название"
			placeholder="Введите название задачи"
			id="task-edit"
			:error="errors.name"
		/>

		<div class="task-form-row">
			<my-field
				class="task-form-row__field"
				v-model="form.start"
				label="Начало"
				type="time"
				id="start-edit"
				:error="errors.start"
			/>

			<my-field
				class="task-form-row__field"
				v-model="form.end"
				label="Конец"
				type="time"
				id="end-edit"
				:error="errors.end"
			/>
		</div>

		<template v-if="repeat">
			<dropdown-list
				v-model="form.week_day"
				label="День недели"
				:items="weekDays"
				id="week-day-edit"
			/>
			<excludes-creator
				id="exceptions-edit"
				label="Исключения"
				v-model="form.exceptions"
			/>
		</template>
		<template v-else>
			<my-field v-model="form.date" label="Дата" type="date" id="date-edit" />
		</template>

		<my-field
			v-model="form.comment"
			label="Комментарий"
			placeholder="Добавьте комментарий"
			type="textarea"
			id="comment-edit"
		/>

		<div class="task-form__actions">
			<button class="task-form__submit" type="submit" @click="handleSubmit">
				Сохранить
			</button>
			<button class="task-form__cancel" type="button" @click="$emit('close')">
				Отмена
			</button>
		</div>
	</form>
</template>

<script>
import { mapActions } from "vuex";
export default {
	name: "task-edit-form",
	props: {
		task: {
			type: Object,
			required: true,
		},
		repeat: {
			type: Boolean,
			required: true,
		},
		date: {
			type: String,
		},
	},
	data() {
		return {
			weekDays: [
				{ value: 1, label: "Понедельник" },
				{ value: 2, label: "Вторник" },
				{ value: 3, label: "Среда" },
				{ value: 4, label: "Четверг" },
				{ value: 5, label: "Пятница" },
				{ value: 6, label: "Суббота" },
				{ value: 0, label: "Воскресенье" },
			],
			form: {
				name: this.task.task,
				start: this.task.start,
				end: this.task.end,
				comment: this.task.comment,
				repeat: this.repeat,
				week_day: this.task.repeat
					? this.getWeekDayNumber(this.task.repeat)
					: null,
				exceptions: this.task.exceptions || null,
				date: this.date,
			},
			errors: {
				name: "",
				start: "",
				end: "",
			},
		};
	},
	methods: {
		getWeekDayNumber(day) {
			const weekDays = {
				sunday: 0,
				monday: 1,
				tuesday: 2,
				wednesday: 3,
				thursday: 4,
				friday: 5,
				saturday: 6,
			};
			return weekDays[day] || null;
		},
		...mapActions({ updateEvent: "events/updateEvent" }),
		handleSubmit() {
			this.updateEvent({ id: this.task.id, event: this.form });
			this.$emit("close");
		},
	},
	mounted() {
		console.log(this.task)
		console.log(this.date)
	},
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals" as *;

.task-form {
	width: 70vw;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem;
	&__title {
		@include font("lg", "bold", "primary");
		color: $color-deep-violet;
	}

	&-row {
		display: flex;
		justify-content: space-between;
		gap: .5rem;
		width: 100%;
		&__field {
			width: clamp(110px, 25vw , 170px); 
		}
	}

	&__actions {
		display: flex;
		gap: 1rem;
	}

	&__submit {
		@include font("base", "medium", "primary");
		flex: 1;
		padding: 0.5rem;
		background-color: $color-deep-violet;
		color: $color-nymph-hips;
		border: none;
		border-radius: 4px;
	}

	&__cancel {
		@include font("base", "medium", "primary");
		flex: 1;
		padding: 0.5rem;
		background-color: get-color("border");
		color: white;
		border: none;
		border-radius: 4px;
	}
}
</style> 