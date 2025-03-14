<template>
  <Button
    :label="label"
    :icon="icon"
    :loading="loading"
    :disabled="disabled"
    class="oe-button"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

defineProps<{
  label?: string
  icon?: string
  loading?: boolean
  disabled?: boolean
}>()

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<style scoped lang="scss">
.oe-button {
  border-radius: 25px !important; // Super rounded for fun
  transition: all 0.3s;
  font-weight: 600;
  background-color: #ff6b6b !important; // Fun bright color
  border-color: #ff6b6b !important;
  padding: 0.6rem 1.2rem !important;
  font-size: 1rem !important;

  // Wiggle animation on hover
  &:not(:disabled):hover {
    animation: wiggle 0.5s ease-in-out;
    box-shadow: 0 6px 0 #ff9e7d !important;
    transform: translateY(-6px);
  }

  &:not(:disabled):active {
    transform: translateY(-2px);
    box-shadow: 0 2px 0 #ff9e7d !important;
  }

  @keyframes wiggle {
    0%,
    100% {
      transform: translateY(-6px) rotate(0deg);
    }
    25% {
      transform: translateY(-6px) rotate(-5deg);
    }
    75% {
      transform: translateY(-6px) rotate(5deg);
    }
  }
}
</style>
