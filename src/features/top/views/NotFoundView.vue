<template>
  <SimpleLayout>
    <div class="oe-not-found">
      <OeCard>
        <template #header>
          <h1 class="oe-not-found__title">404 - Page Not Found</h1>
        </template>
        <div class="oe-not-found__content">
          <h2 class="oe-not-found__subtitle">Oops! The page you're looking for doesn't exist.</h2>
          <p class="oe-not-found__message">It seems you've ventured into uncharted territory.</p>
          <OeButton label="Return to Home" @click="router.push(paths.top)" variant="primary" />
        </div>
      </OeCard>
    </div>
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

.oe-not-found {
  @include oe-container;

  &__title {
    margin: 0;
    @include oe-title-style(2rem, $oe-error-dark);
    text-shadow: 1px 1px 0 $oe-error-color;
  }

  &__content {
    @include oe-flex-column;
    align-items: center;
    text-align: center;
    padding: $oe-spacing-lg $oe-spacing-md $oe-spacing-xl;
  }

  &__subtitle {
    @include oe-subtitle-style($oe-title-font-size, $oe-error-dark);
    margin-bottom: $oe-spacing-md;
  }

  &__message {
    @include oe-text-style($oe-subtitle-font-size, $oe-text-muted);
    margin-bottom: $oe-spacing-xl;
    max-width: 80%;
  }
}
</style>
