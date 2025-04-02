<template>
  <SimpleLayout>
    <div class="oe-dynamic-ui">
      <OeCard>
        <template #header>
          <h1 class="oe-dynamic-ui__title">Dynamic UI</h1>
        </template>
        <div class="oe-dynamic-ui__content">
          <div class="oe-dynamic-ui__actions">
            <OeButton
              label="Generate Dynamic UI"
              :loading="isBusy"
              :disabled="isBusy"
              @click="vm.generateInnerHtml()"
              variant="primary"
            />
          </div>

          <div class="oe-dynamic-ui__output">
            <div v-if="isBusy" class="oe-dynamic-ui__spinner">
              <OeSpinner label="Generating dynamic HTML..." />
            </div>

            <div v-else-if="errorMessage" class="oe-dynamic-ui__error">
              <OeMessage severity="error" :text="errorMessage" />
            </div>

            <div v-else-if="generatedScript" class="oe-dynamic-ui__script">
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

.oe-dynamic-ui {
  @include oe-container;
}

.oe-dynamic-ui__title {
  @include oe-title-style(1.8rem);
  margin: 0;
}

.oe-dynamic-ui__content {
  @include oe-flex-column($oe-spacing-lg);
}

.oe-dynamic-ui__actions {
  display: flex;
  justify-content: center;
}

.oe-dynamic-ui__output {
  background-color: $oe-background-light;
  border-radius: $oe-border-radius-md;
  padding: $oe-spacing-lg;
  min-height: 300px;
  @include oe-playful-border($oe-border-light, $oe-border-style-dashed);
}

.oe-dynamic-ui__error {
  margin-bottom: $oe-spacing-md;
}

.oe-dynamic-ui__script {
  width: 100%;
  font-family: monospace;
}

.oe-dynamic-ui__spinner {
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
import { DynamicUITypes } from 'src/features/dynamic-ui/di/DynamicUITypes'
import type { IDynamicUIViewModel } from 'src/features/dynamic-ui/interfaces/viewModels/IDynamicUIViewModel'
import { useViewModelLifecycleHooks } from 'src/shared/views/composables/useViewModelLifecycleHools'
import { useObservableProps } from 'src/shared/views/composables/useObservableProps'
import { ref } from 'vue'
import SetApiKeyDialog from 'src/shared/llm/views/components/SetApiKeyDialog.vue/SetLlmApiKeyDialog.vue'

const vm = diContainer.get<IDynamicUIViewModel>(DynamicUITypes.ViewModel)

useViewModelLifecycleHooks(vm)

const showSetApiKeyDialog = ref(true)
const errorMessage = useObservableProps(vm, 'errorMessage$')
const generatedScript = useObservableProps(vm, 'generatedScript$')
const isBusy = useObservableProps(vm, 'isBusy$')
</script>
