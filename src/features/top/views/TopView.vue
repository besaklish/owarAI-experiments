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
  color: $oe-secondary-dark;
  text-shadow: 2px 2px 0 $oe-secondary-light;
  margin-bottom: $oe-spacing-xl;
  font-size: 2.5rem;
  transform: rotate(-1deg);
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: $oe-spacing-xl;
  justify-content: space-between;
  padding: $oe-spacing-md;

  @include mq(tablet, mobile) {
    flex-direction: column;
  }

  @include mq(mobile) {
    gap: $oe-spacing-lg;
  }

  .feature-card {
    flex: 1;
    min-width: 280px;
    cursor: pointer;
    transition: transform $oe-transition-duration;

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
  font-size: $oe-title-font-size;
  color: $oe-secondary-dark;
}

.card-content {
  font-size: $oe-subtitle-font-size;
  line-height: 1.5;
  margin: $oe-spacing-sm 0 $oe-spacing-lg 0;
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
