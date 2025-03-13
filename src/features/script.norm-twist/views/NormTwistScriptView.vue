<template>
  <SimpleLayout>
    <div class="norm-twist-container">
      <Card>
        <template #title>
          <h1 style="text-align: center; margin: 0">Norm Twist Script Generator</h1>
        </template>
        <template #content>
          <div style="display: flex; flex-direction: column; gap: 20px">
            <div>
              <label for="theme-input" style="display: block; font-weight: bold; margin-bottom: 8px"
                >Theme</label
              >
              <InputText
                id="theme-input"
                :model-value="theme"
                @update:model-value="vm.setTheme($event as string)"
                placeholder="Starbucks"
                style="width: 100%"
              />

              <Message
                v-if="errorMessage"
                severity="error"
                style="width: 100%; margin-top: 10px; margin-bottom: 5px"
              >
                {{ errorMessage }}
              </Message>
            </div>

            <div>
              <Button
                label="Generate Script"
                icon="pi pi-bolt"
                :loading="isBusy"
                :disabled="isBusy"
                @click="vm.generateScript()"
                style="width: 100%"
              />
            </div>

            <div
              class="script-output"
              style="background-color: #f8f9fa; border-radius: 6px; padding: 16px"
            >
              <div v-if="isBusy" style="display: flex; justify-content: center; width: 100%">
                <ProgressSpinner />
              </div>

              <Panel v-else-if="generatedScript" class="script-content" style="width: 100%">
                <pre>{{ generatedScript }}</pre>
              </Panel>

              <Message v-else severity="info" style="width: 100%; margin: 10px 0">
                Your generated script will appear here
              </Message>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </SimpleLayout>
  <SetApiKeyDialog v-model="showSetApiKeyDialog" />
</template>

<style scoped>
.norm-twist-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.script-content {
  font-family: monospace;
}

.script-output {
  min-height: 300px;
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
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Panel from 'primevue/panel'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
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
