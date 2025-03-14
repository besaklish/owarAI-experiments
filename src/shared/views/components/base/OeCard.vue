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
@use 'src/shared/views/styles/index.scss' as *;

.oe-card {
  @include oe-card-style;

  :deep(.p-card-body) {
    padding: $oe-spacing-lg;
  }

  :deep(.p-card-content) {
    padding: 0;
  }
}

.oe-card-header {
  padding: $oe-spacing-lg;
  border-bottom: $oe-border-width dotted #e2e8f0;
  background-color: $oe-background-light;
  margin: -#{$oe-spacing-lg} -#{$oe-spacing-lg} #{$oe-spacing-lg} -#{$oe-spacing-lg};
}

.oe-card-title {
  margin: 0;
  font-size: $oe-title-font-size;
  font-weight: 700;
  @include oe-title-style;
}

.oe-card-content {
  padding: 0;
}

.oe-card-footer {
  padding: $oe-spacing-lg;
  border-top: $oe-border-width dotted #e2e8f0;
  margin: $oe-spacing-lg -#{$oe-spacing-lg} -#{$oe-spacing-lg} -#{$oe-spacing-lg};
  background-color: $oe-background-light;
}
</style>
