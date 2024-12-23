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
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/globals' as *;

.search {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	padding: 1rem;
  width: 100%;
	max-width: 400px;
	min-height: 200px;
	transition: all 0.3s ease;
	border-radius: 1rem;
  background: linear-gradient(
    135deg, 
    rgba(74, 20, 140, 0.8) 0%,  
    rgba(116, 54, 177, 0.7) 100%
  );
  backdrop-filter: blur(4px);
  
  &-form {
    width: 100%;
    background-color: transparent;
  }
  
  &-field {
    width: 100%;
    padding: 8px 12px;
    outline: none;
    border: none;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.9);
    transition: all 0.2s ease;
    
    &:active,
    &:focus {
      box-shadow: rgba(74, 20, 140, 0.3) 0 0 0 2px;
      background-color: white;
    }
  }
}
</style> 