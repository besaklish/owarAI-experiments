<template>
  <SimpleLayout>
    <div class="oe-funny-dom-manipulation">
      <OeCard>
        <template #header>
          <h1 class="oe-funny-dom-manipulation__title">Funny DOM Manipulation</h1>
        </template>
        <div class="oe-funny-dom-manipulation__content">
          <div class="oe-funny-dom-manipulation__actions">
            <OeButton
              label="Generate Funny DOM"
              :loading="isBusy"
              :disabled="isBusy"
              @click="vm.generateInnerHtml()"
              variant="primary"
            />
          </div>

          <div class="oe-funny-dom-manipulation__output">
            <div v-if="isBusy" class="oe-funny-dom-manipulation__spinner">
              <OeSpinner label="Generating funny HTML..." />
            </div>

            <div v-else-if="errorMessage" class="oe-funny-dom-manipulation__error">
              <OeMessage severity="error" :text="errorMessage" />
            </div>

            <div v-if="generatedScript" class="oe-funny-dom-manipulation__script">
              <div v-html="generatedScript"></div>
            </div>
          </div>
        </div>
      </OeCard>
    </div>
  </SimpleLayout>
  <SetApiKeyDialog v-model="showSetApiKeyDialog" />
</template>

<style scoped lang="scss">
@use 'src/shared/views/styles/index.scss' as *;

.oe-funny-dom-manipulation {
  @include oe-container;
}

.oe-funny-dom-manipulation__title {
  @include oe-title-style(1.8rem);
  margin: 0;
}

.oe-funny-dom-manipulation__content {
  @include oe-flex-column($oe-spacing-lg);
}

.oe-funny-dom-manipulation__actions {
  display: flex;
  justify-content: center;
}

.oe-funny-dom-manipulation__output {
  background-color: $oe-background-light;
  border-radius: $oe-border-radius-md;
  padding: $oe-spacing-lg;
  min-height: 300px;
  @include oe-playful-border($oe-border-light, $oe-border-style-dashed);
}

.oe-funny-dom-manipulation__error {
  margin-bottom: $oe-spacing-md;
}

.oe-funny-dom-manipulation__script {
  width: 100%;
  font-family: monospace;
}

.oe-funny-dom-manipulation__spinner {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center;
}
</style>

<script setup lang="ts">
import SimpleLayout from 'src/shared/views/layouts/SimpleLayout.vue'
import OeCard from 'src/shared/views/components/base/OeCard.vue'
import OeButton from 'src/shared/views/components/base/OeButton.vue'
import OeMessage from 'src/shared/views/components/base/OeMessage.vue'
import OeSpinner from 'src/shared/views/components/base/OeSpinner.vue'
import { diContainer } from 'src/di/inversify.config'
import { FunnyDomManipulationTypes } from 'src/features/funny-dom-manipulation/di/FunnyDomManipulationTypes'
import type { IFunnyDomManipulationViewModel } from 'src/features/funny-dom-manipulation/interfaces/viewModels/IFunnyDomManipulationViewModel'
import { useViewModelLifecycleHooks } from 'src/shared/views/composables/useViewModelLifecycleHools'
import { useObservableProps } from 'src/shared/views/composables/useObservableProps'
import { ref } from 'vue'
import SetApiKeyDialog from 'src/shared/llm/views/components/SetApiKeyDialog.vue/SetLlmApiKeyDialog.vue'

const vm = diContainer.get<IFunnyDomManipulationViewModel>(FunnyDomManipulationTypes.ViewModel)

useViewModelLifecycleHooks(vm)

const showSetApiKeyDialog = ref(true)
const errorMessage = useObservableProps(vm, 'errorMessage$')
const generatedScript = useObservableProps(vm, 'generatedScript$')
const isBusy = useObservableProps(vm, 'isBusy$')
</script>
