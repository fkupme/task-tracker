<template>
	<div class="search">
		<h2 class="search-title">Поиск задач</h2>
		<search-list />
		<div class="search-container">
			<form class="search-form" @submit.prevent>
				<input
					class="search-field"
					v-model="searchValue"
					placeholder="Поиск задач..."
					id="search"
					type="search"
					@input="debouncedSearch(searchValue)"
				/>
			</form>
		</div>
	</div>
</template>

<script>
import SearchList from "@/components/SearchList.vue";
export default {
	name: "search-query",
	components: {
		SearchList,
	},
	data() {
		return {
			searchValue: "",
			timeout: null,
		};
	},
	methods: {
		searchEvents() {
			this.$store.dispatch("events/searchEvents", this.searchValue);
		},
		debouncedSearch() {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.searchEvents();
			}, 500);
		},
	},
	beforeDestroy() {
		clearTimeout(this.timeout);
	},
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals" as *;

.search {
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 1rem;
	width: 100%;
	max-width: 400px;
	background: linear-gradient(
		135deg,
		rgba(74, 20, 140, 0.8) 0%,
		rgba(116, 54, 177, 0.7) 100%
	);
	backdrop-filter: blur(4px);
	border-radius: 1rem;

	&-title {
		margin-bottom: 1rem;
		@include font(2rem, 700, #fff);
	}

	&-container {
		margin-top: auto;
	}

	&-form {
		width: 100%;
	}

	&-field {
		width: 100%;
		padding: 8px 12px;
		border: none;
		border-radius: 4px;
		background-color: rgba(255, 255, 255, 0.9);
		transition: all 0.2s ease;

		&:focus {
			outline: 1px solid rgba(142, 110, 178, 0.3);
			box-shadow: rgba(142, 110, 178, 0.3) 0 0 0 5px;
			background-color: white;
		}
	}
}
</style> 