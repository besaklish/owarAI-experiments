<template>
  <SimpleLayout>
    <div>hello</div>
  </SimpleLayout>
  <SetApiKeyDialog v-model="showSetApiKeyDialog" />
</template>

<script setup lang="ts">
import { diContainer } from 'src/di/inversify.config'
import { LlmTypes } from 'src/shared/llm/di/LlmTypes'
import type { ILlmApiKeyService } from 'src/shared/llm/interfaces/ILlmApiKeyService'
import SimpleLayout from 'src/shared/views/layouts/SimpleLayout.vue'
import { onMounted, ref } from 'vue'
import SetApiKeyDialog from 'src/shared/llm/views/components/SetApiKeyDialog.vue/SetLlmApiKeyDialog.vue'

const llmApiKeyService = diContainer.get<ILlmApiKeyService>(LlmTypes.ApiKeyService)

const showSetApiKeyDialog = ref(false)

onMounted(() => {
  if (!llmApiKeyService.hasApiKey()) {
    showSetApiKeyDialog.value = true
  }
})
</script>
