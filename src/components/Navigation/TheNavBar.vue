<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Tippy } from 'vue-tippy'
const router = useRouter()

const getRouteName = (route: string) => {
  if (route === '/') return 'Home'
  return route.split('/').filter((route) => route !== '')[0]
}
</script>
<template>
  <nav>
    <RouterLink
      style="text-transform: capitalize"
      v-for="{ path, children } in router.options.routes"
      :key="path"
      :to="path"
    >
      <Tippy :interactive="true" :placement="'bottom-start'">
        {{ getRouteName(path) }}

        <template #content>
          <SubNav v-if="children" :routes="children" />
        </template>
      </Tippy>
    </RouterLink>
  </nav>
</template>
