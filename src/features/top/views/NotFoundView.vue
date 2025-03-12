<template>
  <SimpleLayout>
    <Card>
      <template #title> 404 - Page Not Found </template>
      <template #content>
        <div class="not-found-container">
          <h2>Oops! The page you're looking for doesn't exist.</h2>
          <p>It seems you've ventured into uncharted territory.</p>
          <Button label="Return to Home" severity="info" @click="router.push(paths.top)" />
        </div>
      </template>
    </Card>
  </SimpleLayout>
</template>

<script setup lang="ts">
import { Card, Button } from 'primevue'
import { paths } from 'src/shared/router/paths'
import SimpleLayout from 'src/shared/ui/layouts/SimpleLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped lang="scss">
@use 'src/shared/ui/styles/index.scss' as *;

.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;

  h2 {
    margin-bottom: 1rem;
    color: #e74c3c;
  }

  p {
    margin-bottom: 2rem;
    color: #7f8c8d;
  }
}
</style>
