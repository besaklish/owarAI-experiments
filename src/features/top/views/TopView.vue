<template>
  <SimpleLayout>
    <h1>owarAI experiments</h1>
    <main>
      <div class="card-container">
        <Card class="feature-card" @click="router.push(paths.script.normTwist)">
          <template #title> owarAI Script Generator </template>
          <template #content> OwarAI scripts are generated based on the theme you input. </template>
        </Card>
        <Card class="feature-card">
          <template #title> owarAI Dynamic UI </template>
          <template #content> Dynamic UI is presented for you. </template>
        </Card>
      </div>
    </main>
  </SimpleLayout>
</template>

<style scoped lang="scss">
@use 'src/shared/ui/styles/index.scss' as *;

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
    cursor: pointer;

    @include mq(tablet, mobile) {
      min-width: 100%;
    }
  }
}
</style>

<script setup lang="ts">
import { Card } from 'primevue'
import SimpleLayout from 'src/shared/ui/layouts/SimpleLayout.vue'
import { paths } from 'src/shared/router/paths'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
