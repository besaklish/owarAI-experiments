<template>
  <Card class="oe-card">
    <template #header v-if="$slots.header || title">
      <div class="oe-card-header">
        <h3 v-if="title" class="oe-card-title">{{ title }}</h3>
        <slot name="header"></slot>
      </div>
    </template>
    <template #content>
      <div class="oe-card-content">
        <slot></slot>
      </div>
    </template>
    <template #footer v-if="$slots.footer">
      <div class="oe-card-footer">
        <slot name="footer"></slot>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card'

defineProps<{
  title?: string
}>()
</script>

<style scoped lang="scss">
.oe-card {
  border-radius: 30px !important; // Very rounded corners
  overflow: hidden;
  transition: all 0.4s;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
  transform: rotate(-1deg); // Slightly tilted for fun
  border: none !important;

  &:hover {
    transform: rotate(1deg) translateY(-5px); // Tilt the other way on hover
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15) !important;
  }

  :deep(.p-card-body) {
    padding: 1.5rem !important;
  }

  :deep(.p-card-content) {
    padding: 0 !important;
  }
}

.oe-card-header {
  padding: 1.5rem;
  border-bottom: 3px dotted #e2e8f0; // Dotted border for fun
  background-color: #f0f7ff;
  margin: -1.5rem -1.5rem 1.5rem -1.5rem;
}

.oe-card-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #5e35b1;
  text-shadow: 1px 1px 0 #e0e0ff; // Fun text shadow
}

.oe-card-content {
  padding: 0;
}

.oe-card-footer {
  padding: 1.5rem;
  border-top: 3px dotted #e2e8f0; // Dotted border for fun
  margin: 1.5rem -1.5rem -1.5rem -1.5rem;
  background-color: #f0f7ff;
}
</style>
