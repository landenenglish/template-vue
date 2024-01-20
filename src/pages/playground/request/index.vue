<script setup lang="ts">
import axios from 'axios'
import { useRequest } from '@/composable/useRequest'

type ToDo = {
  userId: number
  id: number
  title: string
  completed: boolean
  message?: string
}

const {
  invoke: getToDos,
  data: toDos,
  status,
  code,
  isLoading,
  isError
} = useRequest<ToDo[]>(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // mock slower loading
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
  response.data.message = 'Hello World'
  return response
})

onBeforeMount(() => {
  getToDos()
})
</script>

<template>
  <h1>Fetch Playground</h1>
  <button class="my-4" @click="getToDos">Invoke</button>

  <LoadingSpinner v-if="isLoading" />

  <Transition>
    <div v-if="!isLoading" class="response-content">
      <p>Status: {{ status }}</p>
      <p>Is there an error? : {{ isError ? 'Yes' : 'No' }}</p>
      <p>Status code: {{ code }}</p>
      <p>Response Data:</p>
      <hr />
      <div v-if="toDos" class="todo-list">
        <card v-for="toDo in toDos" :key="toDo.id">
          <pre>{{ toDo }}</pre>
        </card>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss"></style>
