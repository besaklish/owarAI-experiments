<template>
  <div class="oe-spinner">
    <div class="oe-spinner__wrapper">
      <div class="oe-spinner__face" :class="{ 'oe-spinner__face--happy': variant === 'happy' }">
        <div class="oe-spinner__eyes">
          <div class="oe-spinner__eye"></div>
          <div class="oe-spinner__eye"></div>
        </div>
        <div class="oe-spinner__mouth"></div>
      </div>
      <span v-if="label" class="oe-spinner__label">{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  variant?: 'default' | 'happy'
}>()
</script>

<style scoped lang="scss">
@use 'src/shared/views/styles/index.scss' as *;

.oe-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $oe-spacing-md;

  &__wrapper {
    @include oe-flex-column($oe-spacing-md);
    align-items: center;
  }

  &__face {
    width: 60px;
    height: 60px;
    background-color: $oe-warning-color;
    border-radius: 50%;
    position: relative;
    animation: oe-spinner-bounce 1s infinite alternate;
    box-shadow: $oe-shadow-sm;

    &--happy {
      background-color: $oe-success-color;
    }
  }

  &__eyes {
    position: absolute;
    top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  &__eye {
    width: 10px;
    height: 10px;
    background-color: $oe-text-primary;
    border-radius: 50%;
    animation: oe-blink 2.5s infinite;
  }

  &__mouth {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 10px;
    background-color: $oe-text-primary;
    border-radius: 0 0 10px 10px;
    animation: oe-spinner-mouth 1.5s infinite;
  }

  &__label {
    font-weight: $oe-font-weight-bold;
    color: $oe-text-secondary;
    font-size: $oe-body-font-size;
    animation: oe-pulse 1.5s infinite;
  }
}

@keyframes oe-spinner-bounce {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
  100% {
    transform: translateY(0) rotate(-5deg);
  }
}

@keyframes oe-spinner-mouth {
  0%,
  100% {
    width: 20px;
    height: 10px;
    border-radius: 0 0 10px 10px;
  }
  50% {
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
}
</style>
