<script setup lang="ts">
import { Tippy } from 'vue-tippy'
import { type RouteRecordRaw, type RouteLocationRaw } from 'vue-router'

// This is a bit messy/hacky, but it works for building a basic navbar from the file-based routes

const props = defineProps<{
  routes: RouteRecordRaw[]
}>()

const routes = computed(() => props.routes.slice(1))

const getRouteTo = (route: RouteRecordRaw) => {
  if (!route.children) return route.name
  return typeof route.children?.[0]?.name === 'string' ? route.children?.[0]?.name.slice(0, -1) : ''
}
</script>

<template>
  <div class="route-list" v-if="routes.length">
    <template v-for="route in routes" :key="route.path ?? ''">
      <RouterLink
        v-if="route"
        style="text-transform: capitalize"
        :to="getRouteTo(route) as RouteLocationRaw"
      >
        <Tippy v-if="route.path" :interactive="true" :placement="'bottom-start'">
          {{ route.path }}
          <template #content>
            <SubNav v-if="route.children" :routes="route.children" />
          </template>
        </Tippy>
      </RouterLink>
    </template>
  </div>
</template>

<style scoped lang="scss">
.route-list {
  display: flex;

  a {
    &:hover {
      text-decoration: underline;
    }

    // make the words not wrap
    white-space: nowrap;
  }
}
</style>
