<template>
  <SimpleLayout>
    <OeCard>
      <template #header>
        <h1 class="not-found-title">404 - Page Not Found</h1>
      </template>
      <div class="not-found-container">
        <h2 class="not-found-subtitle">Oops! The page you're looking for doesn't exist.</h2>
        <p class="not-found-message">It seems you've ventured into uncharted territory.</p>
        <OeButton label="Return to Home" @click="router.push(paths.top)" />
      </div>
    </OeCard>
  </SimpleLayout>
</template>

<script setup lang="ts">
import OeCard from 'src/shared/views/components/base/OeCard.vue'
import OeButton from 'src/shared/views/components/base/OeButton.vue'
import { paths } from 'src/shared/router/paths'
import SimpleLayout from 'src/shared/views/layouts/SimpleLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped lang="scss">
@use 'src/shared/views/styles/index.scss' as *;

.not-found-title {
  margin: 0;
  font-size: 2rem;
  color: #ff6b6b;
  text-shadow: 1px 1px 0 #ffebee;
  text-align: center;
}

.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 1rem 2rem;
}

.not-found-subtitle {
  margin-bottom: 1rem;
  color: #ff6b6b;
  font-size: 1.5rem;
  transform: rotate(-1deg);
}

.not-found-message {
  margin-bottom: 2rem;
  color: #7f8c8d;
  font-size: 1.2rem;
  max-width: 80%;
  line-height: 1.5;
}
</style>
