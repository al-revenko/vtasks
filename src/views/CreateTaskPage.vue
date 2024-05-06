<template>
  <PageLayout>
    <template #bar>
      <FormBar />
    </template>
    <CreateTaskContent @task-created="callbacks.onTaskCreated" />
  </PageLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/task.store'
import PageLayout from '@/components/layouts/PageLayout.vue'
import FormBar from '@/components/FormBar.vue'
import CreateTaskContent from '@/components/contents/CreateTaskContent.vue'

const taskStore = useTaskStore()
const router = useRouter()

const callbacks = {
  onTaskCreated(task: { title: string; desc: string; microTasks: [] }) {
    const {title, desc, microTasks} = task
    taskStore.addTask(title, {
      desc,
      microTasks
    })

    router.push('home')
  },
}
</script>
