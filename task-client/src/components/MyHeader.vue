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
			<date-time-widget />
			<div
			class="header-search"
			>
				<div >
					<search-query
					v-if="isSearchActive"
					@close="isSearchActive = false"
					/>
					<img
						v-else
						@click="isSearchActive = true"
						src="@/assets/icons/search.svg"
						alt="поиск"
					/>
				</div>
			</div>
		</header>
	</div>
</template>

<script>
import DateTimeWidget from "@/components/Widgets/DateTimeWidget.vue";
import SearchQuery from "@/components/SearchQuery.vue";

export default {
	name: "my-header",
	components: { DateTimeWidget, SearchQuery },
	data() {
		return {
			isAnimating: [false, false],
			isSearchActive: false,
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
		toggleSearch() {
			this.isSearchActive? this.isSearchActive = false : this.isSearchActive = true;
		}
	},
};
</script>

<style lang='scss' scoped>
@use "@/assets/styles/globals" as *;
@use "sass:color";
.header {
	position: relative;
	padding-top: 10px;
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;

	&__logo {
		display: flex;
		align-items: baseline;
		gap: 2px;

		&-letter {
			@include font("2xl", "bold", "secondary", "tight");
			color: $color-indigo;
			text-shadow: 3px 2px 3px rgba(255, 255, 255, 0.2);
			transition: transform 0.3s ease;

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

	&-search {
		position: fixed;
		right: 20px;
		bottom: 20px;

		& > img {
			width: 50px;
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
