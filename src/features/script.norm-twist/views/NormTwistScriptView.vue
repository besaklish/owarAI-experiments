<template>
  <SimpleLayout>
    <div class="oe-norm-twist">
      <OeCard>
        <template #header>
          <h1 class="oe-norm-twist__title">Norm Twist Script Generator</h1>
        </template>
        <div class="oe-norm-twist__content">
          <div class="oe-norm-twist__input">
            <OeInput
              id="theme-input"
              label="Theme"
              :modelValue="theme"
              @update:modelValue="(value) => value !== undefined && vm.setTheme(value)"
              placeholder="Starbucks"
              :errorMessage="errorMessage"
            />
          </div>

          <div class="oe-norm-twist__actions">
            <OeButton
              label="Generate Script"
              :loading="isBusy"
              :disabled="isBusy"
              @click="vm.generateScript()"
              variant="primary"
            />
          </div>

          <div class="oe-norm-twist__output">
            <div v-if="isBusy" class="oe-norm-twist__spinner">
              <OeSpinner label="Generating script..." />
            </div>

            <OeCard v-else-if="generatedScript" class="oe-norm-twist__script">
              <pre>{{ generatedScript }}</pre>
            </OeCard>

            <OeMessage
              v-else
              severity="info"
              text="Your generated script will appear here"
              class="oe-norm-twist__info"
            />
          </div>
        </div>
      </OeCard>
    </div>
  </SimpleLayout>
  <SetApiKeyDialog v-model="showSetApiKeyDialog" />
</template>

<style scoped lang="scss">
@use 'src/shared/views/styles/index.scss' as *;

.oe-norm-twist {
  @include oe-container;
}

.oe-norm-twist__title {
  @include oe-title-style(1.8rem);
  margin: 0;
}

.oe-norm-twist__content {
  @include oe-flex-column($oe-spacing-lg);
}

.oe-norm-twist__input {
  @include oe-flex-column($oe-spacing-sm);
}

.oe-norm-twist__actions {
  display: flex;
  justify-content: center;
}

.oe-norm-twist__output {
  background-color: $oe-background-light;
  border-radius: $oe-border-radius-md;
  padding: $oe-spacing-lg;
  min-height: 300px;
  @include oe-playful-border($oe-border-light, $oe-border-style-dashed);
}

.oe-norm-twist__spinner {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center;
}

.oe-norm-twist__script {
  width: 100%;
  font-family: monospace;
}

.oe-norm-twist__info {
  margin: $oe-spacing-sm 0;
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
