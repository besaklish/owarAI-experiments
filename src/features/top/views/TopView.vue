<template>
  <div>
    <Button>yay</Button>
    <InputText type="text" v-model="value" />
  </div>
</template>

<script setup lang="ts">
import { Button } from 'primevue'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

const value = ref('')
</script>
