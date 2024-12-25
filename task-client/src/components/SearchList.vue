<template>
	<div class="search-list">
		<transition-group name="search-list">
			<search-item
				v-for="item in searchData"
				:key="item.id"
				:searchItem="item"
			/>
		</transition-group>
	</div>
</template>

<script>
export default {
	name: "search-list",
	computed: {
		searchData() {
			return this.$store.state.events.searchData;
		},
	},
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals" as *;

.search-list {
	max-height: 300px;
	overflow-y: auto;
	padding-right: 10px;
	margin: 10px 0;
	text-align: left;

	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
	}

	&::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.3);
		border-radius: 3px;
	}
}

.search-list-enter-active,
.search-list-leave-active {
	transition: all 0.3s ease;
}

.search-list-enter-from,
.search-list-leave-to {
	opacity: 0;
	transform: translateX(-20px);
}
</style>