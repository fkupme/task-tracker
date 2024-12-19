<template>
  <form class="task-form" @submit.prevent="handleSubmit">
    <h3 class="task-form__title">Редактировать задачу</h3>

    <my-field
      v-model="form.task"
      label="Название"
      placeholder="Введите название задачи"
      id="task-edit"
      :error="errors.task"
    />

    <div class="task-form__row">
      <my-field
        v-model="form.start"
        label="Начало"
        type="time"
        id="start-edit"
        :error="errors.start"
      />

      <my-field
        v-model="form.end"
        label="Конец"
        type="time"
        id="end-edit"
        :error="errors.end"
      />
    </div>

    <my-field
      v-model="form.comment"
      label="Комментарий"
      placeholder="Добавьте комментарий"
      type="textarea"
      id="comment-edit"
    />

    <div class="task-form__actions">
      <button class="task-form__submit" type="submit">
        Сохранить
      </button>
      <button 
        class="task-form__delete" 
        type="button"
        @click="handleDelete"
      >
        Удалить
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'task-edit-form',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        task: this.task.task,
        start: this.task.start,
        end: this.task.end,
        comment: this.task.comment
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
      // Валидация и сохранение изменений
    },
    handleDelete() {
      // Удаление задачи
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

  &__actions {
    display: flex;
    gap: 1rem;
  }

  &__submit {
    @include font('base', 'medium', 'primary');
    flex: 1;
    padding: 0.5rem;
    background-color: $color-deep-violet;
    color: $color-nymph-hips;
    border: none;
    border-radius: 4px;
  }

  &__delete {
    @include font('base', 'medium', 'primary');
    flex: 1;
    padding: 0.5rem;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
  }
}
</style> 