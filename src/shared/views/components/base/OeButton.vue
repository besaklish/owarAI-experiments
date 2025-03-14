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
@use 'src/shared/views/styles/index.scss' as *;

.oe-button {
  @include oe-button-style;
}
</style>
