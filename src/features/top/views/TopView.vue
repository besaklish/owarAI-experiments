<template>
  <SimpleLayout>
    <h1 class="page-title">owarAI experiments</h1>
    <main>
      <div class="card-container">
        <OeCard class="feature-card" @click="router.push(paths.script.normTwist)">
          <template #header>
            <h2 class="card-title">owarAI Script Generator</h2>
          </template>
          <p class="card-content">OwarAI scripts are generated based on the theme you input.</p>
          <template #footer>
            <OeButton label="Try it!" />
          </template>
        </OeCard>
        <OeCard class="feature-card">
          <template #header>
            <h2 class="card-title">owarAI Dynamic UI</h2>
          </template>
          <p class="card-content">Dynamic UI is presented for you.</p>
          <template #footer>
            <OeButton label="Coming Soon" disabled />
          </template>
        </OeCard>
      </div>
    </main>
  </SimpleLayout>
</template>

<style scoped lang="scss">
@use 'src/shared/views/styles/index.scss' as *;

.page-title {
  text-align: center;
  color: #5e35b1;
  text-shadow: 2px 2px 0 #e0e0ff;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  transform: rotate(-1deg);
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  padding: 1rem;

  @include mq(tablet, mobile) {
    flex-direction: column;
  }

  @include mq(mobile) {
    gap: 1.5rem;
  }

  .feature-card {
    flex: 1;
    min-width: 280px;
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px) rotate(0deg) !important;
    }

    @include mq(tablet, mobile) {
      min-width: 100%;
    }
  }
}

.card-title {
  margin: 0;
  font-size: 1.5rem;
  color: #5e35b1;
}

.card-content {
  font-size: 1.1rem;
  line-height: 1.5;
  margin: 0.5rem 0 1.5rem 0;
}
</style>

<script setup lang="ts">
import OeCard from 'src/shared/views/components/base/OeCard.vue'
import OeButton from 'src/shared/views/components/base/OeButton.vue'
import SimpleLayout from 'src/shared/views/layouts/SimpleLayout.vue'
import { paths } from 'src/shared/router/paths'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
