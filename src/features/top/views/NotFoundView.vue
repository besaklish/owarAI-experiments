<!-- TODO: Refactor -->
<template>
  <Card>
    <template #title> 404 - Page Not Found </template>
    <template #content>
      <div class="not-found-container">
        <h2>Oops! The page you're looking for doesn't exist.</h2>
        <p>It seems you've ventured into uncharted territory.</p>
        <router-link to="/" class="home-link">Return to Home</router-link>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { Card } from 'primevue'
</script>

<style scoped lang="scss">
@import 'src/shared/ui/styles/index.scss';

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

  .home-link {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #3498db;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
      background-color: #2980b9;
    }

    @include mq(mobile) {
      padding: 0.5rem 1rem;
    }
  }
}
</style>
