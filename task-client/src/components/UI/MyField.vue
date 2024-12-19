<template>
  <div class="field">
    <label v-if="label" :for="id" class="field__label">{{ label }}</label>
    <input
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="field__input"
      v-bind="$attrs"
      :placeholder="placeholder"
      :type="type"
    />
    <span v-if="error" class="field__error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: 'my-field',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    error: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue']
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/globals.scss" as *;

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  &__label {
    @include font('sm', 'medium', 'primary', 'normal');
    color: $color-deep-violet;
  }

  &__input {
    @include font('base', 'regular', 'primary', 'normal');
    padding: 0.5rem;
    border: 1px solid $color-nymph-hips;
    border-radius: 4px;
    color: $color-deep-violet;
    background: transparent;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: $color-deep-violet;
    }

    &::placeholder {
      color: rgba($color-deep-violet, 0.5);
    }
  }

  &__error {
    @include font('xs', 'regular', 'primary', 'tight');
    color: #dc3545;
  }
}
</style> 