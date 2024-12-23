<template>
  <div class="dropdown">
    <label v-if="label" :for="id" class="field__label">{{ label }}</label>
    <div 
      class="dropdown__select field__input" 
      @click="toggleDropdown"
      :class="{ 'dropdown__select_open': isOpen }"
    >
      <span class="dropdown__selected" :class="{ 'dropdown__selected_placeholder': !modelValue }">
        {{ selectedLabel || placeholder }}
      </span>
      <span class="dropdown__arrow">▼</span>
    </div>
    
    <div v-show="isOpen" class="dropdown__options">
      <div 
        v-for="option in items" 
        :key="option.value"
        class="dropdown__option"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
    
    <span v-if="error" class="field__error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: 'dropdown-list',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    items: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Выберите значение'
    },
    id: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    selectedLabel() {
      const selected = this.items.find(item => item.value === this.modelValue)
      return selected ? selected.label : ''
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectOption(option) {
      this.$emit('update:modelValue', option.value)
      this.isOpen = false
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals.scss" as *;

.dropdown {
  position: relative;
  width: 100%;

  &__select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    
    &_open .dropdown__arrow {
      transform: rotate(180deg);
    }
  }

  &__selected {
    &_placeholder {
      color: rgba(0, 0, 0, 0.5);
    }
  }

  &__arrow {
    font-size: 0.8rem;
    transition: transform 0.2s ease;
  }

  &__options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    margin-top: 4px;
    max-height: 200px;
    overflow-y: auto;
  }

  &__option {
    padding: 0.5rem;
    transition: background-color 0.2s ease;
		@include font('base', 'regular', 'primary', 'normal');
		color: get-color('primary');

    &:active {
      background-color: rgba(74, 20, 140, 0.1);
    }
  }
}
</style> 