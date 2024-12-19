<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <h2 class="auth-form__title">Авторизация</h2>
    
    <my-field
      v-model="form.email"
      label="Email"
      placeholder="Введите email"
      type="email"
      id="email"
      :error="errors.email"
    />

    <my-field
      v-model="form.password"
      label="Пароль"
      placeholder="Введите пароль"
      type="password"
      id="password"
      :error="errors.password"
    />

    <button class="auth-form__submit" type="submit">
      Войти
    </button>
  </form>
</template>

<script>
export default {
  name: 'auth-form',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errors: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      // Валидация и отправка формы
    }
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/globals' as *;

.auth-form {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background-color: $color-nymph-hips;
  border-radius: 8px;

  &__title {
    @include font('xl', 'bold', 'primary');
    text-align: center;
    color: $color-deep-violet;
  }

  &__submit {
    @include font('base', 'medium', 'primary');
    padding: 0.5rem;
    background-color: $color-deep-violet;
    color: $color-nymph-hips;
    border: none;
    border-radius: 4px;
  }
}
</style> 