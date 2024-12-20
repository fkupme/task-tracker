<template>
  <div class="search">
		<div>
				<form class="search-form" @submit.prevent>
					<input
						class="search-field"
						v-model="searchValue"
						placeholder="Поиск задач..."
						id="search"
						type="search"
					/>
				</form>
			</div>
	</div>
</template>

<script>
export default {
  name: 'search-query',
  data() {
    return {
      searchValue: '',
			results: []	
    }
  },
  watch: {
    searchValue() {
      this.$emit('search', this.searchValue)
    }
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/globals' as *;

.search {
  width: 100%;
	background-color: $color-nymph-hips;
	&-form{
		background-color: $color-nymph-hips;
	}
	&-field{
		outline: none;
		border: none;
		&:active, &:focus{
			box-shadow: #4a148c 0 0 0 1px;
		}
	}
}
</style> 