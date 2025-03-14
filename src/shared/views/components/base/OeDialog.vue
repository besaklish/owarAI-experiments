<template>
  <Dialog
    :visible="modelValue"
    @update:visible="$emit('update:modelValue', $event)"
    :header="header"
    :modal="true"
    :closable="true"
    :class="[
      'oe-dialog',
      { 'oe-dialog--error': variant === 'error', 'oe-dialog--info': variant === 'info' },
    ]"
    v-bind="$attrs"
  >
    <div class="oe-dialog__content">
      <slot></slot>
    </div>
    <template #footer v-if="$slots.footer">
      <div class="oe-dialog__footer">
        <slot name="footer"></slot>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog'

defineProps<{
  modelValue: boolean
  header?: string
  variant?: 'error' | 'info'
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<style scoped lang="scss">
@use 'sass:color';
@use 'src/shared/views/styles/index.scss' as *;

.oe-dialog {
  @include oe-dialog-style;

  // Base styles for all dialogs
  :deep(.p-dialog-header) {
    padding: $oe-spacing-lg !important;
    border-bottom: $oe-border-width $oe-border-style-dashed $oe-border-light !important;

    .p-dialog-title {
      font-size: $oe-title-font-size !important;
      font-weight: $oe-font-weight-bold !important;
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.5) !important;
    }

    .p-dialog-header-icon {
      border-radius: 50% !important;
      width: 2rem !important;
      height: 2rem !important;
      transition: transform $oe-transition-duration $oe-transition-timing !important;

      &:hover {
        transform: rotate(90deg) !important;
      }
    }
  }

  :deep(.p-dialog-content) {
    padding: 0 !important;
  }

  :deep(.p-dialog-enter-active) {
    animation: oe-bounce 0.4s !important;
  }

  // Error variant
  &--error {
    :deep(.p-dialog-header) {
      background-color: $oe-error-color !important;
      border-bottom: $oe-border-width $oe-border-style-wavy $oe-error-dark !important;

      .p-dialog-title {
        color: $oe-error-text !important;
      }

      .p-dialog-header-icon {
        background-color: color.adjust($oe-error-color, $lightness: 5%) !important;
      }
    }

    :deep(.p-dialog-content) {
      background-color: color.adjust($oe-error-color, $lightness: 8%) !important;
    }

    .oe-dialog__footer {
      border-top: $oe-border-width $oe-border-style-wavy $oe-error-dark !important;
      background-color: $oe-error-color !important;
    }
  }

  // Info variant
  &--info {
    :deep(.p-dialog-header) {
      background-color: $oe-info-color !important;
      border-bottom: $oe-border-width $oe-border-style-wavy $oe-info-dark !important;

      .p-dialog-title {
        color: $oe-info-text !important;
      }

      .p-dialog-header-icon {
        background-color: color.adjust($oe-info-color, $lightness: 5%) !important;
      }
    }

    :deep(.p-dialog-content) {
      background-color: color.adjust($oe-info-color, $lightness: 8%) !important;
    }

    .oe-dialog__footer {
      border-top: $oe-border-width $oe-border-style-wavy $oe-info-dark !important;
      background-color: $oe-info-color !important;
    }
  }

  &__content {
    padding: $oe-spacing-lg;
  }

  &__footer {
    padding: $oe-spacing-md $oe-spacing-lg;
    display: flex;
    justify-content: flex-end;
    gap: $oe-spacing-sm;
  }
}
</style>
