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
.oe-message {
  border-radius: 20px !important; // Very rounded corners
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
  transform: rotate(-1deg); // Slightly tilted for fun
  margin: 1rem 0 !important;

  &:hover {
    transform: rotate(1deg) !important; // Tilt the other way on hover
  }

  // Custom colors and styles for each severity
  &:deep(.p-message-wrapper) {
    padding: 1rem !important;
  }

  &:deep(.p-message-success) {
    background-color: #a5ffbe !important;
    border: 3px solid #00c853 !important;
    border-style: dashed !important; // Dashed border for fun

    .oe-message-title {
      color: #00701a !important;
    }

    .oe-message-text {
      color: #00701a !important;
    }
  }

  &:deep(.p-message-info) {
    background-color: #a7d8ff !important;
    border: 3px solid #0091ea !important;
    border-style: dashed !important;

    .oe-message-title {
      color: #01579b !important;
    }

    .oe-message-text {
      color: #01579b !important;
    }
  }

  &:deep(.p-message-warn) {
    background-color: #fff8bc !important;
    border: 3px solid #ffd600 !important;
    border-style: dashed !important;

    .oe-message-title {
      color: #c67100 !important;
    }

    .oe-message-text {
      color: #c67100 !important;
    }
  }

  &:deep(.p-message-error) {
    background-color: #ffcdd2 !important;
    border: 3px solid #ff1744 !important;
    border-style: dashed !important;

    .oe-message-title {
      color: #b71c1c !important;
    }

    .oe-message-text {
      color: #b71c1c !important;
    }
  }
}

.oe-message-content {
  display: flex;
  flex-direction: column;
}

.oe-message-title {
  font-weight: 700;
  margin-bottom: 0.25rem;
  font-size: 1.1rem;
}

.oe-message-text {
  line-height: 1.5;
}
</style>
