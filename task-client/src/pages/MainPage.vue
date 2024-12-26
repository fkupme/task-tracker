<template>
  <div class="container">
    <div class="landing">
      <div class="landing__content">
        <h1 class="landing__title">Task Tracker</h1>
        <p class="landing__description">Планируйте своё время</p>
        
        <div class="landing__features">
          <div class="feature">
            <i class="fas fa-calendar feature__icon"></i>
            <h3 class="feature__title">События</h3>
            <p class="feature__text">Создавайте и управляйте событиями</p>
          </div>
          
          <div class="feature">
            <i class="fas fa-sync-alt feature__icon"></i>
            <h3 class="feature__title">Повторения</h3>
            <p class="feature__text">Настраивайте регулярные события</p>
          </div>
          
        </div>

        <div class="landing__buttons">
          <router-link to="/auth" class="btn btn--primary">Войти</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/globals.scss' as *;
@use 'sass:map';


.landing {
  min-height: 60dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  &__content {
    width: 100%;
    text-align: center;
    padding: 1.5rem 1rem;
    background-color: rgba(get-color('background'), 0.9);
    border: 1px solid get-color('border');
    border-radius: 1rem;
  }

  &__title {
    @include font('3xl', 'bold', 'primary');
    color: get-color('text');
    margin-bottom: 1rem;
  }

  &__description {
    @include font('lg', 'regular', 'primary');
    color: get-color('text');
    margin-bottom: 1rem;
  }

  &__features {
    display: grid;
    grid-template-columns: 1fr;
    gap: .5rem;
    margin-bottom: 1rem;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.feature {
  padding: 1.5rem;
  background-color: rgba(get-color('primary'), 0.1);
  border-radius: 0.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &__icon {
    font-size: map.get($font-sizes, 'xl');
    color: $color-gold;
    margin-bottom: 0.5rem;
  }

  &__title {
    @include font('lg', 'semibold', 'primary');
    color: get-color('text');
    margin-bottom: 0.5rem;
  }

  &__text {
    @include font('base', 'regular', 'primary');
    color: get-color('text');
  }
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  @include font('md', 'semibold', 'primary');

  &--primary {
    background: $color-gold;
    color: get-color('primary');
  }

  &--outline {
    border: 2px solid $color-gold;
    color: $color-gold;
  }
}
</style>