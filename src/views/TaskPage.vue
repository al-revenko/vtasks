<template>
  <div :class="`bg-blue-500 w-full h-10`">
    {{ task?.title }}
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/task.store'
import type { IMacroTask, ITask } from '@/types/task.interface'

const taskStore = useTaskStore()
const route = useRoute()
const router = useRouter()

const result = taskStore.getTaskById(Number(route.params.id))

if (!result) {
  router.push({ name: 'home' })
}

const task = result as ITask | IMacroTask
</script>
