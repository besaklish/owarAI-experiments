<template>
  <SimpleLayout>
    <div class="norm-twist-container">
      <OeCard>
        <template #header>
          <h1 class="page-title">Norm Twist Script Generator</h1>
        </template>
        <div class="content-container">
          <div class="input-section">
            <OeInput
              id="theme-input"
              label="Theme"
              :modelValue="theme"
              @update:modelValue="(value) => value !== undefined && vm.setTheme(value)"
              placeholder="Starbucks"
            />

            <OeMessage
              v-if="errorMessage"
              severity="error"
              :text="errorMessage"
              class="error-message"
            />
          </div>

          <div class="button-section">
            <OeButton
              label="Generate Script"
              :loading="isBusy"
              :disabled="isBusy"
              @click="vm.generateScript()"
            />
          </div>

          <div class="script-output">
            <div v-if="isBusy" class="spinner-container">
              <OeSpinner label="Generating script..." />
            </div>

            <OeCard v-else-if="generatedScript" class="script-content">
              <pre>{{ generatedScript }}</pre>
            </OeCard>

            <OeMessage
              v-else
              severity="info"
              text="Your generated script will appear here"
              class="info-message"
            />
          </div>
        </div>
      </OeCard>
    </div>
  </SimpleLayout>
  <SetApiKeyDialog v-model="showSetApiKeyDialog" />
</template>

<style scoped lang="scss">
.norm-twist-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  text-align: center;
  margin: 0;
  font-size: 1.8rem;
  color: #5e35b1;
  text-shadow: 1px 1px 0 #e0e0ff;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
  color: #555;
}

.error-message {
  margin-top: 10px;
}

.button-section {
  display: flex;
  justify-content: center;
}

.script-output {
  background-color: #f8f9fa;
  border-radius: 16px;
  padding: 20px;
  min-height: 300px;
  border: 2px dashed #ccc;
}

.spinner-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center;
}

.script-content {
  width: 100%;
  font-family: monospace;
}

.info-message {
  margin: 10px 0;
}

pre {
  white-space: pre-wrap;
  margin: 0;
}
</style>

<script setup lang="ts">
import SimpleLayout from 'src/shared/views/layouts/SimpleLayout.vue'
import { ref } from 'vue'
import SetApiKeyDialog from 'src/shared/llm/views/components/SetApiKeyDialog.vue/SetLlmApiKeyDialog.vue'
import OeCard from 'src/shared/views/components/base/OeCard.vue'
import OeInput from 'src/shared/views/components/base/OeInput.vue'
import OeButton from 'src/shared/views/components/base/OeButton.vue'
import OeMessage from 'src/shared/views/components/base/OeMessage.vue'
import OeSpinner from 'src/shared/views/components/base/OeSpinner.vue'
import { diContainer } from 'src/di/inversify.config'
import { NormTwistScriptTypes } from 'src/features/script.norm-twist/di/NormTwistScriptTypes'
import type { INormTwistScriptViewModel } from 'src/features/script.norm-twist/viewModels/INormTwistScriptViewModel'
import { useViewModelLifecycleHooks } from 'src/shared/views/composables/useViewModelLifecycleHools'
import { useObservableProps } from 'src/shared/views/composables/useObservableProps'

// API key dialog control
const showSetApiKeyDialog = ref(true)

// Get the view model from the DI container
const vm = diContainer.get<INormTwistScriptViewModel>(NormTwistScriptTypes.ViewModel)

// Set up view model lifecycle hooks
useViewModelLifecycleHooks(vm)

// Bind to view model observable properties
const theme = useObservableProps(vm, 'theme$')
const errorMessage = useObservableProps(vm, 'errorMessage$')
const isBusy = useObservableProps(vm, 'isBusy$')
const generatedScript = useObservableProps(vm, 'generatedScript$')
</script>
