<template>
  <div class="oe-spinner-container">
    <div class="oe-spinner">
      <div class="oe-spinner-face">
        <div class="oe-spinner-eyes">
          <div class="oe-spinner-eye"></div>
          <div class="oe-spinner-eye"></div>
        </div>
        <div class="oe-spinner-mouth"></div>
      </div>
      <span v-if="label" class="oe-spinner-label">{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>

<style scoped lang="scss">
.oe-spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.oe-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.oe-spinner-face {
  width: 60px;
  height: 60px;
  background-color: #ffeb3b;
  border-radius: 50%;
  position: relative;
  animation: bounce 1s infinite alternate;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.oe-spinner-eyes {
  position: absolute;
  top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.oe-spinner-eye {
  width: 10px;
  height: 10px;
  background-color: #333;
  border-radius: 50%;
  animation: blink 2.5s infinite;
}

.oe-spinner-mouth {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 10px;
  background-color: #333;
  border-radius: 0 0 10px 10px;
  animation: mouth 1.5s infinite;
}

.oe-spinner-label {
  font-weight: 600;
  color: #666;
  font-size: 1rem;
  animation: pulse 1.5s infinite;
}

@keyframes bounce {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
  100% {
    transform: translateY(0) rotate(-5deg);
  }
}

@keyframes blink {
  0%,
  45%,
  55%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.1);
  }
}

@keyframes mouth {
  0%,
  100% {
    width: 20px;
    height: 10px;
    border-radius: 0 0 10px 10px;
  }
  50% {
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
