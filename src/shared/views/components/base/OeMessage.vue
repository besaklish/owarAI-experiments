<template>
  <Message
    :severity="severity"
    :class="['oe-message', `oe-message--${severity || 'info'}`]"
    :closable="closable"
    @close="$emit('close')"
  >
    <div class="oe-message__content">
      <span v-if="title" class="oe-message__title">{{ title }}</span>
      <span class="oe-message__text">
        <slot>{{ text }}</slot>
      </span>
    </div>
  </Message>
</template>

<script setup lang="ts">
import Message from 'primevue/message'

defineProps<{
  severity?: 'success' | 'info' | 'warn' | 'error'
  title?: string
  text?: string
  closable?: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped lang="scss">
@use 'src/shared/views/styles/index.scss' as *;

.oe-message {
  @include oe-playful-container;
  border-radius: $oe-border-radius-md !important;
  overflow: hidden;
  box-shadow: $oe-shadow-sm !important;
  margin: $oe-spacing-md 0 !important;

  // Custom colors and styles for each severity
  &:deep(.p-message-wrapper) {
    padding: $oe-spacing-md !important;
  }

  &--success {
    &:deep(.p-message-success) {
      @include oe-message-style($oe-success-color, $oe-success-dark, $oe-success-text);
    }
  }

  &--info {
    &:deep(.p-message-info) {
      @include oe-message-style($oe-info-color, $oe-info-dark, $oe-info-text);
    }
  }

  &--warn {
    &:deep(.p-message-warn) {
      @include oe-message-style($oe-warning-color, $oe-warning-dark, $oe-warning-text);
    }
  }

  &--error {
    &:deep(.p-message-error) {
      @include oe-message-style($oe-error-color, $oe-error-dark, $oe-error-text);
    }
  }

  &__content {
    @include oe-flex-column($oe-spacing-xs);
  }

  &__title {
    font-weight: $oe-font-weight-bold;
    font-size: $oe-subtitle-font-size;
  }

  &__text {
    line-height: $oe-line-height-normal;
  }
}
</style>
