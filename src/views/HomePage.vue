<template>
  <PageLayout>
    <template #bar>
      <MainBar v-model:mode="mode" v-model:form-is-show="formModalIsShow" />
    </template>
    <CardsLayout>
      <template v-for="task in tasks" :key="task.id">
        <TaskCard
          v-bind="task"
          v-model:is-done="task.isDone"
          v-model:nested-data="task.nested"
          @click="callbacks.onTaskCardClick"
        />
      </template>
    </CardsLayout>
  </PageLayout>
  <template v-if="currentTask">
    <TaskModal
      v-bind="currentTask"
      v-model:is-done="currentTask.isDone"
      v-model:nested-data="currentTask.nested"
      v-model:is-show="taskModalIsShow"
      @status-change="callbacks.onStatusChange"
      @task-delete="callbacks.onTaskDelete"
    />
  </template>
  <TaskFormModal v-model:is-show="formModalIsShow" @task-created="callbacks.onTaskCreated" />
</template>

<script setup lang="ts">
import { computed, ref, watch, toRef } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/task.store'
import useBreakpoints from '@/composables/useBreakpoints'
import useDisableScroll from '@/composables/useDisableScroll'
import type { ITask } from '@/types/task.interface'
import PageLayout from '@/components/layouts/PageLayout.vue'
import CardsLayout from '@/components/layouts/CardsLayout.vue'
import TaskCard from '@/components/TaskCard.vue'
import TaskModal from '@/components/TaskModal.vue'
import TaskFormModal from '@/components/TaskFormModal.vue'
import MainBar from '@/components/MainBar.vue'

const router = useRouter()
const taskStore = useTaskStore()

const tasks = computed(() => {
  if (mode.value === null) {
    return taskStore.$state.tasks
  }

  return taskStore.getTasksByStatus(mode.value, taskStore.$state.tasks)
})

const mode = ref<boolean | null>(null)
const currentTask = ref<ITask | null>(null)
const taskModalIsShow = ref<boolean>(false)
const formModalIsShow = ref<boolean>(false)
const breakpointMatch = ref<boolean>(false)

const callbacks = {
  onTaskCardClick(id: number) {
    const task = taskStore.getTaskById(id)
    if (task) {
      currentTask.value = task
      taskModalIsShow.value = true
    }
  },

  onStatusChange({ id, status }: { id: number; status: boolean }) {
    taskStore.forceTaskStatus(id, status)
  },

  onTaskDelete(id: number) {
    taskStore.deleteTaskByID(id)
  },

  onClickAdd() {
    formModalIsShow.value = true
  },

  onTaskCreated(formData: { title: string; desc?: string; microTasks?: string[] }) {
    taskStore.addTask(formData.title, { desc: formData.desc, microTasks: formData.microTasks })
  },

  taskRedirect() {
    if (breakpointMatch.value && taskModalIsShow.value && currentTask.value) {
      const id = currentTask.value.id
      currentTask.value = null
      taskModalIsShow.value = false
      useDisableScroll(toRef(false))
      router.push({ name: 'task', params: { id } })
    }
  },

  createRedirect() {
    if (breakpointMatch.value && formModalIsShow.value) {
      formModalIsShow.value = false
      useDisableScroll(toRef(false))
      router.push({ name: 'create' })
    }
  },
}

useBreakpoints(1024, (match) => {
  breakpointMatch.value = !match
  callbacks.taskRedirect()
  callbacks.createRedirect()
})

watch(taskModalIsShow, () => {
  callbacks.taskRedirect()
})

watch(formModalIsShow, () => {
  callbacks.createRedirect()
})
</script>
