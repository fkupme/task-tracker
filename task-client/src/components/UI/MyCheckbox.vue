<template>
  <div class="checkbox-wrapper">
    <input 
      type="checkbox" 
      :id="id" 
      class="checkbox" 
      v-model="isChecked"
      @change="updateValue"
    >
    <label :for="id" class="checkbox-label">
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  name: 'my-checkbox',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    isChecked: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.checked);
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals" as *;

.checkbox-wrapper {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.checkbox {
	display: none;

	& + .checkbox-label {
		position: relative;
		padding-left: 2rem;
		user-select: none;

		&::before {
			box-sizing: border-box;
			content: "";
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 1.25rem;
			height: 1.25rem;
			outline: 3px solid $color-gold;
			border: 3px solid #fff;
			border-radius: 50%;
			background-color: #fff;
			transition: all 0.2s ease;
		}
	}

	&:checked + .checkbox-label::before {
		border-color: #fff;
		background-color: $color-gold;
	}
}
</style> 