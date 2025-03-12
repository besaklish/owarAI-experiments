<template>
  <Dialog
    :header="'Set API Key'"
    :visible="modelValue"
    @update:visible="emit('update:modelValue', $event)"
  >
    <div class="dialog-layout">
      <div>You need OpenAI's API key to use this application.</div>
      <IftaLabel>
        <Password
          input-id="api-key"
          :model-value="apiKey"
          @update:model-value="vm.setApiKey($event)"
          placeholder="sk-"
          :feedback="false"
        />
        <label for="api-key">API Key</label>
      </IftaLabel>
      <Message
        v-for="message in errorMessages"
        :key="message"
        severity="error"
        variant="simple"
        size="small"
      >
        {{ message }}
      </Message>
      <Button @click="handleClose">Close</Button>
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
import { diContainer } from 'src/di/inversify.config'
import { LlmTypes } from 'src/shared/llm/di/LlmTypes'
import type { ILlmApiKeyViewModel } from 'src/shared/llm/interfaces/ILlmApiKeyViewModel'
import { useObservableProps } from 'src/shared/views/composables/useObservableProps'
import { useViewModelLifecycleHooks } from 'src/shared/views/composables/useViewModelLifecycleHools'
import Message from 'primevue/message'
import { onMounted } from 'vue'
import Button from 'primevue/button'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const vm = diContainer.get<ILlmApiKeyViewModel>(LlmTypes.ApiKeyViewModel)
useViewModelLifecycleHooks(vm)
const apiKey = useObservableProps(vm, 'apiKey$')
const errorMessages = useObservableProps(vm, 'errorMessages$')

onMounted(() => {
  if (apiKey.value === '') {
    emit('update:modelValue', true)
  }
})

const handleClose = () => {
  const saveApiKeyResult = vm.saveApiKeyIfValid()

  if (saveApiKeyResult.isErr) {
    return
  }

  emit('update:modelValue', false)
}
</script>
