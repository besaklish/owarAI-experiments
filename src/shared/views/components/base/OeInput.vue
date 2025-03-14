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
.oe-input-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.oe-input-label {
  font-weight: 600;
  color: #7b68ee; // Fun purple color
  font-size: 1rem;
  transform: rotate(-1deg); // Slight tilt for fun
  display: inline-block;
  margin-bottom: 0.25rem;
  padding-left: 0.5rem;

  // Add a fun underline
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #9c88ff, transparent);
    border-radius: 2px;
    margin-top: 2px;
  }
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
