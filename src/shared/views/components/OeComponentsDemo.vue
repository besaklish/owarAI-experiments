<template>
  <div class="oe-demo">
    <OeCard title="OwarAI Experiments Components">
      <!-- Buttons -->
      <section class="oe-demo__section">
        <h3 class="oe-demo__title">OeButton</h3>
        <div class="oe-demo__row">
          <div class="oe-demo__component">
            <h4 class="oe-demo__subtitle">Default</h4>
            <OeButton label="Click Me!" @click="count++" />
          </div>
          <div class="oe-demo__component">
            <h4 class="oe-demo__subtitle">Primary</h4>
            <OeButton label="Primary" variant="primary" />
          </div>
          <div class="oe-demo__component">
            <h4 class="oe-demo__subtitle">Secondary</h4>
            <OeButton label="Secondary" variant="secondary" />
          </div>
          <div class="oe-demo__component">
            <h4 class="oe-demo__subtitle">Disabled</h4>
            <OeButton label="Disabled" disabled />
          </div>
          <div class="oe-demo__counter">Count: {{ count }}</div>
        </div>
      </section>

      <!-- Inputs -->
      <section class="oe-demo__section">
        <h3 class="oe-demo__title">OeInput</h3>
        <div class="oe-demo__row">
          <div class="oe-demo__component">
            <h4 class="oe-demo__subtitle">Default</h4>
            <OeInput v-model="inputValue" label="Fun Input" placeholder="Type something fun..." />
          </div>
          <div class="oe-demo__component">
            <h4 class="oe-demo__subtitle">With Error</h4>
            <OeInput
              v-model="errorInputValue"
              label="Error Input"
              placeholder="Error example"
              errorMessage="This is an error message"
            />
          </div>
          <div class="oe-demo__component">
            <h4 class="oe-demo__subtitle">Disabled</h4>
            <OeInput
              v-model="disabledInputValue"
              label="Disabled Input"
              placeholder="Disabled"
              disabled
            />
          </div>
          <div v-if="inputValue" class="oe-demo__echo">You typed: {{ inputValue }}</div>
        </div>
      </section>

      <!-- Messages -->
      <section class="oe-demo__section">
        <h3 class="oe-demo__title">OeMessage</h3>
        <div class="oe-demo__column">
          <OeMessage severity="success" title="Woohoo!" text="You did something awesome!" />
          <OeMessage
            severity="info"
            title="Hey there!"
            text="Just letting you know something cool."
          />
          <OeMessage severity="warn" title="Uh oh!" text="Be careful what you're doing!" />
          <OeMessage severity="error" title="Oops!" text="Something went terribly wrong!" />
        </div>
      </section>

      <!-- Spinners -->
      <section class="oe-demo__section">
        <h3 class="oe-demo__title">OeSpinner</h3>
        <div class="oe-demo__row oe-demo__row--center">
          <div class="oe-demo__component">
            <h4 class="oe-demo__subtitle">Default</h4>
            <OeSpinner label="Loading..." />
          </div>
          <div class="oe-demo__component">
            <h4 class="oe-demo__subtitle">Happy</h4>
            <OeSpinner label="Happy Loading..." variant="happy" />
          </div>
        </div>
      </section>

      <!-- Dialogs -->
      <section class="oe-demo__section">
        <h3 class="oe-demo__title">OeDialog</h3>
        <div class="oe-demo__row">
          <div class="oe-demo__component">
            <h4 class="oe-demo__subtitle">Info Dialog</h4>
            <OeButton
              label="Open Info Dialog"
              variant="primary"
              @click="infoDialogVisible = true"
            />
            <OeDialog v-model="infoDialogVisible" header="Info Dialog" variant="info">
              <div class="oe-demo__dialog-content">
                <p>This is an info dialog box!</p>
                <p>Try closing it and opening it again to see the animation.</p>
                <OeInput v-model="dialogInput" placeholder="Type something here..." />
              </div>
              <template #footer>
                <OeButton label="Close" variant="primary" @click="infoDialogVisible = false" />
              </template>
            </OeDialog>
          </div>
          <div class="oe-demo__component">
            <h4 class="oe-demo__subtitle">Error Dialog</h4>
            <OeButton
              label="Open Error Dialog"
              variant="secondary"
              @click="errorDialogVisible = true"
            />
            <OeDialog v-model="errorDialogVisible" header="Error Dialog" variant="error">
              <div class="oe-demo__dialog-content">
                <p>This is an error dialog box!</p>
                <p>Something went wrong!</p>
              </div>
              <template #footer>
                <OeButton label="Close" @click="errorDialogVisible = false" />
              </template>
            </OeDialog>
          </div>
        </div>
      </section>

      <!-- Cards -->
      <section class="oe-demo__section">
        <h3 class="oe-demo__title">OeCard</h3>
        <div class="oe-demo__row">
          <div class="oe-demo__component">
            <h4 class="oe-demo__subtitle">Default</h4>
            <OeCard title="I'm a Fun Card!">
              <p>Cards are great for containing content in a fun way!</p>
              <p>Hover over me to see what happens!</p>
            </OeCard>
          </div>
          <div class="oe-demo__component">
            <h4 class="oe-demo__subtitle">Outlined</h4>
            <OeCard title="Outlined Card" outlined>
              <p>This card has an outlined style!</p>
              <p>It looks different from the default card.</p>
            </OeCard>
          </div>
        </div>
      </section>
    </OeCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OeButton from 'src/shared/views/components/base/OeButton.vue'
import OeCard from 'src/shared/views/components/base/OeCard.vue'
import OeDialog from 'src/shared/views/components/base/OeDialog.vue'
import OeInput from 'src/shared/views/components/base/OeInput.vue'
import OeMessage from 'src/shared/views/components/base/OeMessage.vue'
import OeSpinner from 'src/shared/views/components/base/OeSpinner.vue'

const count = ref(0)
const inputValue = ref('')
const errorInputValue = ref('')
const disabledInputValue = ref('')
const infoDialogVisible = ref(false)
const errorDialogVisible = ref(false)
const dialogInput = ref('')
</script>

<style scoped lang="scss">
@use 'src/shared/views/styles/index.scss' as *;

.oe-demo {
  @include oe-container;
  font-family: $oe-font-family;

  &__section {
    margin-bottom: $oe-spacing-xl;
  }

  &__title {
    @include oe-title-style;
    margin-bottom: $oe-spacing-md;
  }

  &__subtitle {
    @include oe-subtitle-style($oe-small-font-size);
    margin-top: 0;
    margin-bottom: $oe-spacing-sm;
  }

  &__row {
    @include oe-flex-row($oe-spacing-md);
    flex-wrap: wrap;

    &--center {
      justify-content: center;
    }
  }

  &__column {
    @include oe-flex-column($oe-spacing-md);
  }

  &__component {
    min-width: 200px;
    margin-bottom: $oe-spacing-md;
  }

  &__counter {
    @include oe-playful-border($oe-info-dark);
    background-color: $oe-info-color;
    padding: $oe-spacing-sm $oe-spacing-md;
    border-radius: $oe-border-radius-md;
    font-weight: $oe-font-weight-bold;
    color: $oe-info-text;
  }

  &__echo {
    @include oe-playful-border($oe-secondary-color);
    background-color: lighten($oe-secondary-color, 20%);
    padding: $oe-spacing-sm $oe-spacing-md;
    border-radius: $oe-border-radius-md;
    font-weight: $oe-font-weight-bold;
    color: darken($oe-secondary-dark, 10%);
  }

  &__dialog-content {
    @include oe-flex-column($oe-spacing-md);
    padding: $oe-spacing-md 0;

    p {
      margin: 0;
    }
  }
}
</style>
