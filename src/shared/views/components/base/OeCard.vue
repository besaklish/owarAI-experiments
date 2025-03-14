<template>
  <Card :class="['oe-card', { 'oe-card--outlined': outlined }]">
    <template #header v-if="$slots.header || title">
      <div class="oe-card__header">
        <h3 v-if="title" class="oe-card__title">{{ title }}</h3>
        <slot name="header"></slot>
      </div>
    </template>
    <template #content>
      <div class="oe-card__content">
        <slot></slot>
      </div>
    </template>
    <template #footer v-if="$slots.footer">
      <div class="oe-card__footer">
        <slot name="footer"></slot>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card'

defineProps<{
  title?: string
  outlined?: boolean
}>()
</script>

<style scoped lang="scss">
@use 'src/shared/views/styles/index.scss' as *;

.oe-card {
  @include oe-card-style($oe-rotation-sm);

  :deep(.p-card-body) {
    padding: $oe-spacing-lg;
  }

  :deep(.p-card-content) {
    padding: 0;
  }

  &--outlined {
    @include oe-playful-border($oe-border-light, $oe-border-style-dotted);
    transform: rotate(0deg);

    &:hover {
      transform: translateY($oe-hover-lift);
    }
  }

  &__header {
    padding: $oe-spacing-lg;
    border-bottom: $oe-border-width $oe-border-style-dotted $oe-border-light;
    background-color: $oe-background-light;
    margin: -#{$oe-spacing-lg} -#{$oe-spacing-lg} #{$oe-spacing-lg} -#{$oe-spacing-lg};
  }

  &__title {
    margin: 0;
    @include oe-title-style($oe-title-font-size);
  }

  &__content {
    padding: 0;
  }

  &__footer {
    padding: $oe-spacing-lg;
    border-top: $oe-border-width $oe-border-style-dotted $oe-border-light;
    margin: $oe-spacing-lg -#{$oe-spacing-lg} -#{$oe-spacing-lg} -#{$oe-spacing-lg};
    background-color: $oe-background-light;
  }
}
</style>
