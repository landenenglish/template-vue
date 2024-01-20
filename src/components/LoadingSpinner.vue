<script setup lang="ts">
withDefaults(
  defineProps<{
    text: String
  }>(),
  {
    text: () => 'Loading'
  }
)
</script>

<template>
  <div class="loading-indicator">
    <span v-if="text">{{ text }}</span>
    <div class="spinner"></div>
  </div>
</template>

<style lang="scss">
.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  span {
    margin-right: 0.5rem;
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: var(--primary);
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
