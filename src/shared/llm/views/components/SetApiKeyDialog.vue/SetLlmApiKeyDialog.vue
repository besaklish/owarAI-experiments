<template>
  <OeDialog
    header="Set API Key"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    variant="info"
  >
    <div class="oe-api-key-dialog">
      <div class="oe-api-key-dialog__instruction">
        You need OpenAI's API key to use this application.
      </div>
      <OeInput
        id="api-key"
        label="API Key"
        :modelValue="apiKey"
        @update:modelValue="(value) => value !== undefined && vm.setApiKey(value)"
        placeholder="sk-"
        type="password"
        :errorMessage="errorMessage"
      />
      <div class="oe-api-key-dialog__actions">
        <OeButton label="Close" @click="handleClose" variant="primary" />
      </div>
    </div>
  </OeDialog>
</template>

<style scoped lang="scss">
@use 'src/shared/views/styles/index.scss' as *;

.oe-api-key-dialog {
  @include oe-flex-column($oe-spacing-lg);
  padding: $oe-spacing-sm;

  > * {
    width: 100%;
  }

  &__instruction {
    @include oe-text-style($oe-subtitle-font-size, $oe-text-secondary);
    text-align: center;
    margin-bottom: $oe-spacing-sm;
  }

  &__actions {
    display: flex;
    justify-content: center;
    margin-top: $oe-spacing-md;
  }
}
</style>

<script setup lang="ts">
import { diContainer } from 'src/di/inversify.config'
import { LlmTypes } from 'src/shared/llm/di/LlmTypes'
import type { ILlmApiKeyViewModel } from 'src/shared/llm/interfaces/viewModels/ILlmApiKeyViewModel'
import { useObservableProps } from 'src/shared/views/composables/useObservableProps'
import { useViewModelLifecycleHooks } from 'src/shared/views/composables/useViewModelLifecycleHools'
import OeDialog from 'src/shared/views/components/base/OeDialog.vue'
import OeButton from 'src/shared/views/components/base/OeButton.vue'
import OeInput from 'src/shared/views/components/base/OeInput.vue'

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
