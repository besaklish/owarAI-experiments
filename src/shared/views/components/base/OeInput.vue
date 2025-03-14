<template>
  <div class="oe-input-container">
    <label v-if="label" :for="id" class="oe-input-label">{{ label }}</label>
    <InputText
      :id="id"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
      :disabled="disabled"
      class="oe-input"
      v-bind="$attrs"
    />
    <small v-if="errorMessage" class="oe-input-error-message">{{ errorMessage }}</small>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string | undefined
  placeholder?: string
  disabled?: boolean
  errorMessage?: string
  label?: string
  id?: string
}>()

// Generate a random ID if none is provided for label association
const id = computed(() => props.id || `oe-input-${Math.random().toString(36).substring(2, 9)}`)

defineEmits<{
  (e: 'update:modelValue', value: string | undefined): void
}>()
</script>

<style scoped lang="scss">
@use 'src/shared/views/styles/index.scss' as *;

.oe-input-container {
  display: flex;
  flex-direction: column;
  gap: $oe-spacing-sm;
  width: 100%;
}

.oe-input-label {
  @include oe-input-label-style;
}

.oe-input {
  @include oe-input-style;
}

.oe-input-error-message {
  color: $oe-error-dark;
  font-size: $oe-small-font-size;
  margin-top: $oe-spacing-xs;
  font-style: italic;
}
</style>
