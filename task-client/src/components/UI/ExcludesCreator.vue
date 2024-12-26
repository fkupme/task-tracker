<template>
	<div class="excludes">
		<div class="excludes-list">
			<div class="excludes__item" v-for="exclude in excludes" :key="exclude">
				<div class="excludes__date">{{ formatDate(exclude) }}</div>
				<button class="excludes__delete-button" @click="deleteExclude(exclude)">
					<img src="@/assets/icons/x-close.svg" alt="delete" />
				</button>
			</div>
		</div>
		<div class="excludes-input">
			<my-field
				type="date"
				:label="label"
				v-model="exclude"
				:id="id"
				:min="today"
			/>
			<button
				class="excludes-add-button"
				@click="addExclude"
				:disabled="!isValidDate"
			>
				<img
					class="excludes-add-button__icon"
					src="@/assets/icons/plus.svg"
					alt="plus"
				/>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "excludes-creator",
	data() {
		return {
			excludes: [...this.modelValue],
			exclude: "",
		};
	},
	props: {
		modelValue: {
			type: Array,
			required: true,
			default: () => [],
		},
		label: {
			type: String,
			required: true,
		},
		id: {
			type: String,
			required: true,
		},
	},
	computed: {
		today() {
			return new Date().toISOString().split("T")[0];
		},
		isValidDate() {
			return this.exclude && !this.excludes.includes(this.exclude);
		},
	},
	methods: {
		formatDate(date) {
			const [year, month, day] = date.split("-");
			return `${day}.${month}.${year}`;
		},
		deleteExclude(exclude) {
			this.excludes = this.excludes.filter((item) => item !== exclude);
			this.updateValue();
		},
		addExclude() {
			if (this.isValidDate) {
				this.excludes.push(this.exclude);
				this.exclude = "";
				this.updateValue();
			}
		},
		updateValue() {
			this.$emit("update:modelValue", [...this.excludes]);
		},
	},
	watch: {
		modelValue: {
			handler(newVal) {
				this.excludes = [...newVal];
			},
			deep: true,
		},
	},
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals.scss" as *;

.excludes {
	display: flex;
	flex-direction: column;
	gap: 10px;

	&-list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	&__item {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 5px 10px;
		background-color: $color-nymph-hips;
		border-radius: 4px;
	}

	&__date {
		@include font("sm", "medium", "primary");
		color: $color-deep-violet;
	}

	&__delete-button {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		display: flex;
		align-items: center;

		img {
			width: 16px;
			height: 16px;
		}
	}

	&-input {
		display: flex;
		gap: 10px;
		width: 100%;
		align-items: flex-end;
	}

	&-add-button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		padding: 8px;

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		&__icon {
			width: 20px;
			height: 20px;
		}
	}
}
</style>