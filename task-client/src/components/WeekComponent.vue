<template>
	<div class="wrapper">
		<div class="week">
			<button class="week-component-activate-button" @click="activate" :class="{ 'week-component-activate-button_active': active }">
				<div class="bar1" :class="{ 'bar1_active': active }"></div>
				<div class="bar2" :class="{ 'bar2_active': active }"></div>
			</button>
			<div class="week-component" :class="{ 'week-component_active': active }">
				<fast-day-component
					:class="{ 'week-component__day_active': active }"
					v-for="(day, key) in days"
					:date="key"
					:day="day"
					:key="key"
					:active="active"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import FastDayComponent from "@/components/FastDayComponent.vue";

export default {
	name: "week-component",
	data() {
		return {
			active: false,
		};
	},
	methods: {
		activate() {
			this.active = !this.active;
		},
	},
	components: { FastDayComponent },
	props: {
		days: Object,
	},
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals" as *;

.wrapper {
	min-height: 5dvh;
	width: 100%;
	position: relative;
	padding-left: 2rem;
}

.week-component {
	display: flex;
	gap: 2vw;
	position: relative;
	padding-bottom: 1vw;
	overflow-x: auto;

	&-activate-button {
		background-color: transparent;
		border: none;
		padding: 0.5rem;
		position: absolute;
		top: 50%;
		left: -5px;
		transform: translateY(-50%);
		z-index: 3;
		display: flex;
		flex-direction: column;
		gap: 2px;
		&_active {
			right: 0;
			top: 0;
		}

		.bar1,
		.bar2 {
			width: 20px;
			height: 3px;
			background-color: $color-deep-violet;
			transition: transform 0.3s ease-in-out;
		}

		.bar1 {
			transform: rotate(45deg) translateY(-5px);
			&_active {
				transform: rotate(405deg) translateY(3px);
			}
		}
		.bar2 {
			transform: rotate(-45deg) translateY(5px);
			&_active {
				transform: rotate(-405deg) translateY(-3px);
			}
		}
	}

	&_active {
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		padding: 1rem;
		background-color: rgba(255, 255, 255, 0.95);
		z-index: 2;
		overflow-y: auto;
	}
}
</style>