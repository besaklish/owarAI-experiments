<template>
  <Button
    :label="label"
    :icon="icon"
    :loading="loading"
    :disabled="disabled"
    :class="[
      'oe-button',
      {
        'oe-button--primary': variant === 'primary',
        'oe-button--secondary': variant === 'secondary',
      },
    ]"
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
  variant?: 'primary' | 'secondary'
}>()

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<style scoped lang="scss">
@use 'src/shared/views/styles/index.scss' as *;

.oe-button {
  @include oe-button-style;

  &--primary {
    background-color: $oe-primary-color;
    border-color: $oe-primary-color;

    &:not(:disabled):hover {
      box-shadow: 0 6px 0 $oe-primary-light;
    }
  }

  &--secondary {
    background-color: $oe-secondary-color;
    border-color: $oe-secondary-color;

    &:not(:disabled):hover {
      box-shadow: 0 6px 0 $oe-secondary-light;
    }
  }
}
</style>
