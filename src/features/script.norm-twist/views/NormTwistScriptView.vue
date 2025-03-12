<template>
  <SimpleLayout>
    <div>hello</div>
  </SimpleLayout>
  <SetApiKeyDialog v-model="showSetApiKeyDialog" />
</template>

<script setup lang="ts">
import SimpleLayout from 'src/shared/views/layouts/SimpleLayout.vue'
import { ref } from 'vue'
import SetApiKeyDialog from 'src/shared/llm/views/components/SetApiKeyDialog.vue/SetLlmApiKeyDialog.vue'

const showSetApiKeyDialog = ref(true)
</script>
