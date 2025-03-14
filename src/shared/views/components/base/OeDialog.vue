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
.oe-dialog {
  border-radius: 30px !important; // Very rounded corners
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;

  :deep(.p-dialog-header) {
    padding: 1.5rem !important;
    background-color: #ffcdd2 !important; // Fun pink color
    border-bottom: 4px wavy #ff8a80 !important; // Wavy border for fun

    .p-dialog-title {
      font-size: 1.5rem !important;
      font-weight: 700 !important;
      color: #c62828 !important;
      text-shadow: 1px 1px 0 #ffebee !important; // Fun text shadow
    }

    .p-dialog-header-icon {
      background-color: #ffebee !important;
      border-radius: 50% !important;
      width: 2rem !important;
      height: 2rem !important;

      &:hover {
        transform: rotate(90deg) !important;
        background-color: #ffcdd2 !important;
      }
    }
  }

  :deep(.p-dialog-content) {
    padding: 0 !important;
    background-color: #fff8f8 !important; // Light pink background
  }

  // Add a bounce animation when opening
  :deep(.p-dialog-enter-active) {
    animation: dialog-bounce 0.4s !important;
  }

  @keyframes dialog-bounce {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    50% {
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
}

.oe-dialog-content {
  padding: 1.5rem;
}

.oe-dialog-footer {
  padding: 1.25rem;
  border-top: 4px wavy #ff8a80 !important; // Wavy border for fun
  background-color: #ffcdd2 !important;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}
</style>
