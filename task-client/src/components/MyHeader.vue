<template>
	<div class="container">
		<header class="header">
			<div class="header__logo" @click="animateLogo">
				<span
					class="header__logo-letter"
					:class="{ animate: isAnimating[0] }"
					:style="{ '--skew': '-10deg' }"
					>V</span
				>
				<span
					class="header__logo-letter"
					:class="{ animate: isAnimating[1] }"
					:style="{ '--skew': '10deg' }"
					>V</span
				>
				<span class="header__logo-text">Task</span>
			</div>
			<day-bar />
			<profile-widget class="header-profile-widget" />
			<div
				class="header-fixed-button"
				:class="{ 'header-fixed-button_active': isSearchActive }"
			>
				<div>
					<search-query
						v-if="isSearchActive"
						v-click-outside="() => toggle('isSearchActive')"
						@click.stop
					/>
					<img
						class="header-fixed-button-icon"
						v-else
						@click.stop="toggle('isSearchActive')"
						src="@/assets/icons/search.svg"
						alt="поиск"
					/>
				</div>
			</div>
			<div
				class="header-fixed-button header-fixed-button_task-create"
				:class="{ 'header-fixed-button_active': isTaskCreateActive }"
			>
				<div>
					<task-create-form
						v-if="isTaskCreateActive"
						v-click-outside="() => toggle('isTaskCreateActive')"
						@click.stop
					/>
					<img
						class="header-fixed-button-icon"
						v-else
						@click.stop="toggle('isTaskCreateActive')"
						src="@/assets/icons/plus.svg"
						alt="создать задачу"
					/>
				</div>
			</div>
		</header>
	</div>
</template>

<script>
import DayBar from "@/components/DayBar.vue";
import SearchQuery from "@/components/Forms/SearchQuery.vue";
import TaskCreateForm from "@/components/Forms/TaskCreateForm.vue";
import ProfileWidget from "@/components/Widgets/ProfileWidget.vue";

export default {
	name: "my-header",
	components: { DayBar, SearchQuery, TaskCreateForm, ProfileWidget },
	data() {
		return {
			isAnimating: [false, false],
			isSearchActive: false,
			isTaskCreateActive: false,
		};
	},
	methods: {
		animateLogo() {
			this.$router.push("/");
			this.isAnimating = [true, true];
			setTimeout(() => {
				this.isAnimating = [false, false];
			}, 500);
		},
		toggle(property) {
			this[property] ? (this[property] = false) : (this[property] = true);
		},
	},
	computed: {
		isAuth() {
			return this.$store.state.auth.isAuth;
		}
	}
};
</script>

<style lang='scss' scoped>
@use "@/assets/styles/globals" as *;
@use "sass:color";
.header {
		position: relative;
    padding-top: 10px;
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-between;
    align-items: flex-start;
		.header-profile-widget {
			grid-column: 2;
			grid-row: 1 / span 2;
		}
	&__logo {
		display: flex;
		align-items: baseline;
		gap: 2px;

		&-letter {
			@include font("2xl", "bold", "secondary", "tight");
			color: $color-indigo;
			text-shadow: 3px 2px 3px rgba(255, 255, 255, 0.2);
			transition: all 0.3s ease;

			&:first-child {
				--skew: -10deg;
				transform: skew(var(--skew));
			}

			&:nth-child(2) {
				--skew: 10deg;
				transform: skew(var(--skew));
			}

			&.animate {
				animation: jumpLetter 0.5s ease;
			}
		}

		&-text {
			@include font("xl", "medium", "secondary", "tight");
			color: color.adjust($color-indigo, $lightness: 10%);
			margin-left: 4px;
		}
	}

	&-fixed-button {
		position: fixed;
		right: 20px;
		bottom: 20px;
		z-index: 1001;
		text-align: right;
		width: 100px;
		transition: width 0.3s ease, opacity 0.3s ease;
		&_active {
			z-index: 1001;
			opacity: 1;
			width: 75vw;
			transition: width 0.3s ease, opacity 0.3s ease;
		}
		&_task-create {
			text-align: left;
			left: 20px;
		}
		&-icon {
			width: 50px;
			transition: transform 0.3s ease;
		}
	}
}

@keyframes jumpLetter {
	0% {
		transform: translateY(0) skew(var(--skew));
	}
	50% {
		transform: translateY(-10px) skew(var(--skew));
	}
	100% {
		transform: translateY(0) skew(var(--skew));
	}
}
</style>
