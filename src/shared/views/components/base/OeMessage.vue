<template>
  <Message :severity="severity" class="oe-message" :closable="closable" @close="$emit('close')">
    <div class="oe-message-content">
      <span v-if="title" class="oe-message-title">{{ title }}</span>
      <span class="oe-message-text">
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
  border-radius: $oe-border-radius-md !important;
  overflow: hidden;
  box-shadow: $oe-shadow-sm !important;
  transform: rotate(-1deg);
  margin: $oe-spacing-md 0 !important;

  &:hover {
    transform: rotate(1deg) !important;
  }

  // Custom colors and styles for each severity
  &:deep(.p-message-wrapper) {
    padding: $oe-spacing-md !important;
  }

  &:deep(.p-message-success) {
    @include oe-message-style($oe-success-color, $oe-success-dark, $oe-success-text);
  }

  &:deep(.p-message-info) {
    @include oe-message-style($oe-info-color, $oe-info-dark, $oe-info-text);
  }

  &:deep(.p-message-warn) {
    @include oe-message-style($oe-warning-color, $oe-warning-dark, $oe-warning-text);
  }

  &:deep(.p-message-error) {
    @include oe-message-style($oe-error-color, $oe-error-dark, $oe-error-text);
  }
}

.oe-message-content {
  display: flex;
  flex-direction: column;
}

.oe-message-title {
  font-weight: 700;
  margin-bottom: $oe-spacing-xs;
  font-size: $oe-subtitle-font-size;
}

.oe-message-text {
  line-height: 1.5;
}
</style>
