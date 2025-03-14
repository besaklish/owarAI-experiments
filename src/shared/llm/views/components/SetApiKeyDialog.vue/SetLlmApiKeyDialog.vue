<template>
  <OeDialog
    header="Set API Key"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <div class="dialog-layout">
      <div class="instruction-text">You need OpenAI's API key to use this application.</div>
      <OeInput
        id="api-key"
        label="API Key"
        :modelValue="apiKey"
        @update:modelValue="(value) => value !== undefined && vm.setApiKey(value)"
        placeholder="sk-"
        type="password"
      />
      <OeMessage v-if="errorMessage" severity="error" :text="errorMessage" />
      <OeButton label="Close" @click="handleClose" />
    </div>
  </OeDialog>
</template>

<style scoped lang="scss">
.dialog-layout {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  > * {
    width: 100%;
  }
}

.instruction-text {
  font-size: 1.1rem;
  color: #555;
  text-align: center;
  margin-bottom: 0.5rem;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-weight: 600;
  color: #555;
  margin-bottom: 0.25rem;
}
</style>

<script setup lang="ts">
import { diContainer } from 'src/di/inversify.config'
import { LlmTypes } from 'src/shared/llm/di/LlmTypes'
import type { ILlmApiKeyViewModel } from 'src/shared/llm/interfaces/ILlmApiKeyViewModel'
import { useObservableProps } from 'src/shared/views/composables/useObservableProps'
import { useViewModelLifecycleHooks } from 'src/shared/views/composables/useViewModelLifecycleHools'
import OeDialog from 'src/shared/views/components/base/OeDialog.vue'
import OeButton from 'src/shared/views/components/base/OeButton.vue'
import OeInput from 'src/shared/views/components/base/OeInput.vue'
import OeMessage from 'src/shared/views/components/base/OeMessage.vue'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const vm = diContainer.get<ILlmApiKeyViewModel>(LlmTypes.ApiKeyViewModel)
useViewModelLifecycleHooks(vm)
const apiKey = useObservableProps(vm, 'apiKey$')
const errorMessage = useObservableProps(vm, 'errorMessage$')

const handleClose = () => {
  const saveApiKeyResult = vm.saveApiKeyIfValid()

  if (saveApiKeyResult.isOk) {
    emit('update:modelValue', false)
  }
}
</script>
