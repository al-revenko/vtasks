<template>
  <PageLayout>
    <template #bar>
      <TaskBar
        v-if="task.nested"
        :percentage="percentage"
        v-model:status="task.isDone"
        @status-change="callbacks.onStatusChange"
        @delete="callbacks.onDelete"
      />
      <TaskBar
        v-else
        v-model:status="task.isDone"
        @status-change="callbacks.onStatusChange"
        @delete="callbacks.onDelete"
      />
    </template>
    <TaskContent v-model="task" @microtask-add="callbacks.onMicroTaskAdd" />
  </PageLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/task.store'
import { type ITask } from '@/types/task.interface'
import usePercentage from '@/composables/usePercentage'
import PageLayout from '@/components/layouts/PageLayout.vue'
import TaskBar from '@/components/TaskBar.vue'
import TaskContent from '@/components/contents/TaskContent.vue'

const taskStore = useTaskStore()
const route = useRoute()
const router = useRouter()

const result = taskStore.getTaskById(Number(route.params.id))

if (!result) {
  router.push({ name: 'home' })
}

const task = result as ITask

const percentage = computed(() => usePercentage(task.nested).value)

const callbacks = {
  onStatusChange() {
    taskStore.forceTaskStatus(task.id, task.isDone)
  },

  onDelete() {
    taskStore.deleteTaskByID(task.id)
    router.push({ name: 'home' })
  },

  onMicroTaskAdd(title: string) {
    taskStore.addMicroTasks(task, [title])
  },
}
</script>
