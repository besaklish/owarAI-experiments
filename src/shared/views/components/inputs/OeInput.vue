<template>
  <div class="oe-input-container">
    <InputText
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

defineProps<{
  modelValue: string | undefined
  placeholder?: string
  disabled?: boolean
  errorMessage?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string | undefined): void
}>()
</script>

<style scoped lang="scss">
.oe-input-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
}

.oe-input {
  border-radius: 20px !important; // Very rounded
  padding: 0.7rem 1rem !important;
  transition: all 0.3s ease;
  border: 3px dashed #9c88ff !important; // Dashed border for fun
  background-color: #f8f9fa !important;

  &:focus {
    transform: scale(1.03) rotate(-1deg) !important; // Slight tilt when focused
    border-color: #9c88ff !important;
    box-shadow: 0 0 0 3px rgba(156, 136, 255, 0.3) !important;
  }

  &:hover:not(:disabled) {
    background-color: #f0f0ff !important;
  }
}

.oe-input-error-message {
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  font-style: italic;
}
</style>
