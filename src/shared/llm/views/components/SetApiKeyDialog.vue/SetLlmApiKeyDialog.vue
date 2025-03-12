<template>
  <Dialog :header="'Set API Key'" :visible="modelValue" @update:visible="handleUpdateVisible">
    <div class="dialog-layout">
      <div>You need OpenAI's API key to use this application.</div>
      <IftaLabel>
        <Password input-id="api-key" v-model="apiKey" placeholder="sk-" :feedback="false" />
        <label for="api-key">API Key</label>
      </IftaLabel>
      <Button @click="llmApiKeyService.setApiKey(apiKey)" label="Save" />
    </div>
  </Dialog>
</template>

<style scoped lang="scss">
.dialog-layout {
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  > * {
    width: 100%;
  }
}
</style>

<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Password from 'primevue/password'
import IftaLabel from 'primevue/iftalabel'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import { diContainer } from 'src/di/inversify.config'
import { LlmTypes } from 'src/shared/llm/di/LlmTypes'
import type { ILlmApiKeyService } from 'src/shared/llm/interfaces/ILlmApiKeyService'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const llmApiKeyService = diContainer.get<ILlmApiKeyService>(LlmTypes.ApiKeyService)
const apiKey = ref('')

onMounted(() => {
  const getApiKeyResult = llmApiKeyService.getApiKey()

  if (getApiKeyResult.isErr) {
    emit('update:modelValue', true)
  } else {
    apiKey.value = getApiKeyResult.value
    emit('update:modelValue', false)
  }
})

const handleUpdateVisible = (value: boolean) => {
  const getApiKeyResult = llmApiKeyService.getApiKey()

  if (getApiKeyResult.isOk) {
    emit('update:modelValue', value)
  }
}
</script>
