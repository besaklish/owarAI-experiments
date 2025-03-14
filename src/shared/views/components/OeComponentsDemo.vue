<template>
  <div class="oe-components-demo">
    <OeCard title="OwarAI Experiments Fun Components">
      <div class="demo-section">
        <h3 class="demo-title">OeButton</h3>
        <div class="demo-row">
          <OeButton label="Click Me!" @click="count++" />
          <div class="counter">Count: {{ count }}</div>
        </div>
      </div>

      <div class="demo-section">
        <h3 class="demo-title">OeInput</h3>
        <div class="demo-row">
          <OeInput v-model="inputValue" label="Fun Input" placeholder="Type something fun..." />
          <div v-if="inputValue" class="echo">You typed: {{ inputValue }}</div>
        </div>
      </div>

      <div class="demo-section">
        <h3 class="demo-title">OeMessage</h3>
        <div class="demo-column">
          <OeMessage severity="success" title="Woohoo!" text="You did something awesome!" />
          <OeMessage
            severity="info"
            title="Hey there!"
            text="Just letting you know something cool."
          />
          <OeMessage severity="warn" title="Uh oh!" text="Be careful what you're doing!" />
          <OeMessage severity="error" title="Oops!" text="Something went terribly wrong!" />
        </div>
      </div>

      <div class="demo-section">
        <h3 class="demo-title">OeSpinner</h3>
        <div class="demo-row center">
          <OeSpinner label="Loading..." />
        </div>
      </div>

      <div class="demo-section">
        <h3 class="demo-title">OeDialog</h3>
        <div class="demo-row">
          <OeButton label="Open Fun Dialog" @click="dialogVisible = true" />
          <OeDialog v-model="dialogVisible" header="Fun Dialog!">
            <div class="dialog-content">
              <p>This is a super fun dialog box!</p>
              <p>Try closing it and opening it again to see the animation.</p>
              <OeInput v-model="dialogInput" placeholder="Type something here..." />
            </div>
            <template #footer>
              <OeButton label="Close" @click="dialogVisible = false" />
            </template>
          </OeDialog>
        </div>
      </div>

      <div class="demo-section">
        <h3 class="demo-title">OeCard</h3>
        <div class="demo-row">
          <OeCard title="I'm a Fun Card!">
            <p>Cards are great for containing content in a fun way!</p>
            <p>Hover over me to see what happens!</p>
          </OeCard>
        </div>
      </div>
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
const dialogVisible = ref(false)
const dialogInput = ref('')
</script>

<style scoped lang="scss">
@use 'src/shared/views/styles/index.scss' as *;

.oe-components-demo {
  padding: $oe-spacing-xl;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Comic Sans MS', cursive, sans-serif; // Fun font!
}

.demo-section {
  margin-bottom: $oe-spacing-xl;
}

.demo-title {
  margin-bottom: $oe-spacing-md;
  color: $oe-secondary-dark;
  font-weight: 700;
  text-shadow: 1px 1px 0 $oe-secondary-light;
  font-size: $oe-title-font-size;
  @include oe-title-style;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: $oe-spacing-md;
  align-items: center;

  &.center {
    justify-content: center;
  }
}

.demo-column {
  display: flex;
  flex-direction: column;
  gap: $oe-spacing-md;
}

.counter {
  background-color: $oe-info-color;
  padding: $oe-spacing-sm $oe-spacing-md;
  border-radius: $oe-border-radius-md;
  font-weight: bold;
  color: $oe-info-text;
  border: 2px dashed $oe-info-dark;
}

.echo {
  background-color: lighten($oe-secondary-color, 20%);
  padding: $oe-spacing-sm $oe-spacing-md;
  border-radius: $oe-border-radius-md;
  font-weight: bold;
  color: darken($oe-secondary-dark, 10%);
  border: 2px dashed $oe-secondary-color;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  gap: $oe-spacing-md;
  padding: $oe-spacing-md 0;

  p {
    margin: 0;
  }
}
</style>
