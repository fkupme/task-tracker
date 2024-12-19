<template>
  <form class="search" @submit.prevent>
    <my-field
      v-model="searchValue"
      placeholder="Поиск задач..."
      id="search"
      type="search"
    />
  </form>
</template>

<script>
export default {
  name: 'search-query',
  data() {
    return {
      searchValue: ''
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
}
</style> 