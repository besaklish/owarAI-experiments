<template>
  <Dialog
    :visible="modelValue"
    @update:visible="$emit('update:modelValue', $event)"
    :header="header"
    :modal="true"
    :closable="true"
    class="oe-dialog"
    v-bind="$attrs"
  >
    <div class="oe-dialog-content">
      <slot></slot>
    </div>
    <template #footer v-if="$slots.footer">
      <div class="oe-dialog-footer">
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
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<style scoped lang="scss">
@use 'src/shared/views/styles/index.scss' as *;

.oe-dialog {
  @include oe-dialog-style;

  :deep(.p-dialog-header) {
    padding: $oe-spacing-lg !important;
    background-color: $oe-error-color !important;
    border-bottom: 4px wavy $oe-error-dark !important;

    .p-dialog-title {
      font-size: $oe-title-font-size !important;
      font-weight: 700 !important;
      color: $oe-error-text !important;
      text-shadow: 1px 1px 0 lighten($oe-error-color, 5%) !important;
    }

    .p-dialog-header-icon {
      background-color: lighten($oe-error-color, 5%) !important;
      border-radius: 50% !important;
      width: 2rem !important;
      height: 2rem !important;

      &:hover {
        transform: rotate(90deg) !important;
        background-color: $oe-error-color !important;
      }
    }
  }

  :deep(.p-dialog-content) {
    padding: 0 !important;
    background-color: lighten($oe-error-color, 8%) !important;
  }

  // Add a bounce animation when opening
  :deep(.p-dialog-enter-active) {
    animation: oe-bounce 0.4s !important;
  }
}

.oe-dialog-content {
  padding: $oe-spacing-lg;
}

.oe-dialog-footer {
  padding: $oe-spacing-md $oe-spacing-lg;
  border-top: 4px wavy $oe-error-dark !important;
  background-color: $oe-error-color !important;
  display: flex;
  justify-content: flex-end;
  gap: $oe-spacing-sm;
}
</style>
