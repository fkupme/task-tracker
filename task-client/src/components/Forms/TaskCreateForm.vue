<template>
  <form class="task-form" @submit.prevent="handleSubmit">
    <h3 class="task-form__title">Новая задача</h3>

    <my-field
      v-model="form.task"
      label="Название"
      placeholder="Введите название задачи"
      id="task"
      :error="errors.task"
    />

    <div class="task-form__row">
      <my-field
        v-model="form.start"
        label="Начало"
        type="time"
        id="start"
        :error="errors.start"
      />

      <my-field
        v-model="form.end"
        label="Конец"
        type="time"
        id="end"
        :error="errors.end"
      />
    </div>

    <my-field
      v-model="form.comment"
      label="Комментарий"
      placeholder="Добавьте комментарий"
      type="textarea"
      id="comment"
    />

    <button class="task-form__submit" type="submit">
      Создать
    </button>
  </form>
</template>

<script>
export default {
  name: 'task-create-form',
  data() {
    return {
      form: {
        task: '',
        start: '',
        end: '',
        comment: ''
      },
      errors: {
        task: '',
        start: '',
        end: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      // Валидация и создание задачи
    }
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/globals' as *;

.task-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  &__title {
    @include font('lg', 'bold', 'primary');
    color: $color-deep-violet;
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
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