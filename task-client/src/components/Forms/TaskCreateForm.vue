<template>
	<form class="task-form" @submit.prevent="handleSubmit">
		<h3 class="task-form__title">Новая задача</h3>
		<my-checkbox v-model="form.repeat" id="task-repeat">
			Повторять?
		</my-checkbox>
		<my-field
			class="task-form__field"
			v-model="form.name"
			label="Название"
			placeholder="Введите название задачи"
			id="task"
			@update:modelValue="handleNameChange"
			:error="errors.task"
		/>

			<dropdown-list
				v-if="form.repeat"
				class="task-form__field"
				v-model="form.weekday"
				:items="weekdays"
				label="День недели"
				placeholder="Выберите день недели"
				id="weekday"
				:error="errors.weekday"
			/>
			<my-field
				v-else
				class="task-form__field"
				v-model="form.date"
				label="Дата"
				placeholder="Введите дату"
				id="date"
				:error="errors.date"
				type="date"
			/>

		<div class="task-form-row">
			<my-field
				class="task-form__field"
				v-model="form.start"
				label="Начало"
				type="time"
				id="start"
				:error="errors.start"
			/>

			<my-field
				class="task-form__field"
				v-model="form.end"
				label="Конец"
				type="time"
				id="end"
				:error="errors.end"
			/>
		</div>

		<my-field
			class="task-form__field"
			v-model="form.comment"
			label="Комментарий"
			placeholder="Добавьте комментарий"
			type="textarea"
			id="comment"
		/>

		<excludes-creator
		v-if="form.repeat"
		id="exceptions-edit"
		label="Исключения"
		v-model="form.exceptions" 
		/>

		<button class="task-form__submit" type="submit" @submit="handleSubmit, clearForm">Создать</button>
	</form>
</template>

<script>


export default {
	name: "task-create-form",

	data() {
		return {
			weekdays: [
				{ value: "0", label: "Воскресенье" },
				{ value: "1", label: "Понедельник" },
				{ value: "2", label: "Вторник" },
				{ value: "3", label: "Среда" },
				{ value: "4", label: "Четверг" },
				{ value: "5", label: "Пятница" },
				{ value: "6", label: "Суббота" },
			],
			form: {
				name: "",
				start: "",
				end: "",
				comment: "",
				repeat: false,
				weekday: "",
				exceptions: [],
			},
			errors: {
				task: "",
				start: "",
				end: "",
			},
			counter: 0,
		};
	},
	methods: {
		handleSubmit() {
			this.$store.dispatch("events/createEvent", this.form);			
			this.$emit("close");
		},
		clearForm() {
			this.form = {
				name: "",
				start: "",
				end: "",
				comment: "",
				repeat: false,
				weekday: "",
				exceptions: [],
			};
		},
		increment() {
			this.counter++;
		},
	},
};
</script>

<style lang="scss">
@use "@/assets/styles/globals" as *;

.task-form {
	width: 100%;
	max-width: 400px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	gap: 1rem;
	padding: 1rem;
	min-height: 200px;
	transition: all 0.3s ease;
	border-radius: 1rem;
	background: linear-gradient(
		135deg,
		rgba(74, 20, 140, 0.8) 0%,
		rgba(116, 54, 177, 0.7) 100%
	);
	backdrop-filter: blur(4px);

	&__title {
		@include font("lg", "bold", "primary");
		color: $color-nymph-hips;
	}
	&-row {
		display: flex;
		gap: 1rem;
		width: 100%;
	}

	&__submit {
		@include font("base", "medium", "primary");
		padding: 0.5rem;
		background-color: rgba(255, 255, 255, 0.9);
		color: $color-deep-violet;
		border: none;
		border-radius: 4px;
		width: 100%;
		transition: all 0.2s ease;

		&:active,
		&:focus {
			box-shadow: rgba(74, 20, 140, 0.3) 0 0 0 2px;
			background-color: white;
		}
	}
}

.field {
	&__input {
		background-color: rgba(255, 255, 255, 0.9);
		transition: all 0.2s ease;

		&:active,
		&:focus {
			box-shadow: rgba(74, 20, 140, 0.3) 0 0 0 2px;
			background-color: white;
		}
	}

	&__label {
		color: $color-nymph-hips;
	}
}
</style> 