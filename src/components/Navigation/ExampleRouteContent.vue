<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

withDefaults(
  defineProps<{
    heading?: string
    paragraphs?: string[]
  }>(),
  {
    paragraphs: () => []
  }
)
</script>

<template>
  <pre>{{ router.currentRoute.value.fullPath }}</pre>
  <h1 v-if="heading">{{ heading }}</h1>
  <p v-for="(paragraph, index) of paragraphs" :key="index">{{ paragraph }}</p>
</template>
