<template>
  <div class="oe-input" :class="{ 'oe-input--error': !!errorMessage }">
    <label v-if="label" :for="id" class="oe-input__label">{{ label }}</label>
    <InputText
      :id="id"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
      :disabled="disabled"
      class="oe-input__field"
      v-bind="$attrs"
    />
    <small v-if="errorMessage" class="oe-input__error">{{ errorMessage }}</small>
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

.oe-input {
  @include oe-flex-column($oe-spacing-sm);
  width: 100%;

  &--error {
    .oe-input__field {
      border-color: $oe-error-dark;

      &:focus {
        box-shadow: 0 0 0 3px rgba($oe-error-dark, 0.3);
      }
    }
  }

  &__label {
    @include oe-input-label-style;
  }

  &__field {
    @include oe-input-style;
  }

  &__error {
    color: $oe-error-dark;
    font-size: $oe-small-font-size;
    margin-top: $oe-spacing-xs;
    font-style: italic;
  }
}
</style>
