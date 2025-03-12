<template>
  <Card>
    <template #title> owarAI experiments </template>
    <template #content>
      <div class="card-container">
        <Card class="feature-card">
          <template #title> owarAI Script Generator </template>
          <template #content> OwarAI scripts are generated based on the theme you input. </template>
        </Card>
        <Card class="feature-card">
          <template #title> owarAI Dynamic UI </template>
          <template #content> Dynamic UI is presented for you. </template>
        </Card>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { Card } from 'primevue'
</script>

<style scoped lang="scss">
@import 'src/shared/ui/styles/index.scss';

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;

  @include mq(tablet, mobile) {
    flex-direction: column;
  }

  @include mq(mobile) {
    gap: 0.5rem;
  }

  .feature-card {
    flex: 1;
    min-width: 250px;

    @include mq(tablet, mobile) {
      min-width: 100%;
    }
  }
}
</style>
