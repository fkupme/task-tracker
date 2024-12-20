<template>
	<div class="wrapper">
		<div class="week-header">
			<div class="week-header__title">Неделя № {{ 1 }}</div>
			<div class="week-header__dates">{{ firstDay }} - {{ lastDay }}</div>
			<button
				class="week-component-activate-button"
				@click="push('week', { week: this.week }, 500), (isActive = !isActive)"
			>
				<div class="bar1" :class="{ 'bar1_active': isActive }"></div>
				<div class="bar2" :class="{ 'bar2_active': isActive }"></div>
			</button>
		</div>
		<div class="week">
			<div class="week-component">
				<fast-day-component
					class="week-component-day"
					v-for="(day, key, index) in days"
					:date="key"
					:day="day"
					:key="key"
					:style="{ 
						'transition-delay': isActive ? `${index * 0.040}s` :null,
						'transform': isActive ? 'translateY(-10px)': null
					}"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import FastDayComponent from "@/components/FastDayComponent.vue";
import pushMixin from "@/mixins/pushMixin";

export default {
	data() {
		return {
			isActive: false,
			week: 1
		};
	},
	name: "week-component",
	components: { FastDayComponent },
	props: {
		days: Object,
	},
	mixins: [pushMixin],
	computed: {
		firstDay() {
			return Object.keys(this.days)[0].split("-")[2];
		},
		lastDay() {
			const keys = Object.keys(this.days);
			return keys[keys.length - 1].split("-")[2];
		},
	},
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals" as *;
@use "sass:color";

.wrapper {
	min-height: 5dvh;
	width: 100%;
}

.week {
	display: flex;
	flex-direction: column;
	gap: 1vw;
	&-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1vw;
		padding-left: 0.5rem;

		&__title {
			@include font("m", "medium", "primary");
			color: $color-deep-violet;
		}

		&__dates {
			@include font("l", "regular", "primary");
			color: color.adjust($color-deep-violet, $alpha: -0.4);
		}
	}
	&-component {
		display: flex;
		gap: 2vw;
		position: relative;
		padding-bottom: 1vw;
		&-day {
			transition: transform 0.3s ease-in-out;
		}
		&-activate-button {
			background-color: transparent;
			border: none;
			z-index: 3;
			display: flex;

			.bar1,
			.bar2 {
				width: 20px;
				height: 3px;
				border-radius: 30px;
				background-color: $color-deep-violet;
				transition: transform 2s ease-in;
			}

			.bar1 {
				transform: rotate(45deg) translate(3px, -3px);
				&_active {
					transform: rotate(9045deg) translate(3px, -3px);
				}
			}
			.bar2 {
				transform: rotate(-45deg) translate(-3px, -3px);
				&_active {
					transform: rotate(-9045deg) translate(-3px, -3px);
				}
			}
		}
	}
}
</style>