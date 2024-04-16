<template>
  <PageLayout>
    <template #bar>
      <MainBar v-model:mode="mode" v-model:form-is-show="formModalIsShow" />
    </template>
    <CardsLayout>
      <template v-for="task in tasks" :key="task.id">
        <TaskCard
          v-if="isMacroTask(task)"
          v-bind="task"
          v-model:is-done="task.isDone"
          v-model:macro-task-data="task.nestedData"
          @click="callbacks.onTaskCardClick"
        />
        <TaskCard
          v-else
          v-bind="task"
          v-model:is-done="task.isDone"
          @click="callbacks.onTaskCardClick"
        />
      </template>
    </CardsLayout>
  </PageLayout>
  <template v-if="currentTask">
    <TaskModal
      v-if="isMacroTask(currentTask)"
      v-bind="currentTask"
      v-model:is-done="currentTask.isDone"
      v-model:macro-task-data="currentTask.nestedData"
      v-model:is-show="taskModalIsShow"
      @status-change="callbacks.onStatusChange"
      @task-delete="callbacks.onTaskDelete"
    />
    <TaskModal
      v-else
      v-bind="currentTask"
      v-model:is-done="currentTask.isDone"
      v-model:is-show="taskModalIsShow"
      @task-delete="callbacks.onTaskDelete"
    />
  </template>
  <CreateTaskModal v-model:is-show="formModalIsShow" @task-created="callbacks.onTaskCreated" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ITask } from '@/types/task.interface'
import isMacroTask from '@/guards/isMacroTask.guard'
import { useTaskStore } from '@/stores/task.store'
import PageLayout from '@/components/layouts/PageLayout.vue'
import CardsLayout from '@/components/layouts/CardsLayout.vue'
import TaskCard from '@/components/TaskCard.vue'
import TaskModal from '@/components/TaskModal.vue'
import CreateTaskModal from '@/components/CreateTaskModal.vue'
import MainBar from '@/components/MainBar.vue'

const taskStore = useTaskStore()
const mode = ref<boolean | null>(null)

const tasks = computed(() => {
  if (mode.value === null) {
    return taskStore.$state.tasks
  }

  return taskStore.getTasksByStatus(mode.value, taskStore.$state.tasks)
})

const currentTask = ref<ITask | null>(null)
const taskModalIsShow = ref<boolean>(false)
const formModalIsShow = ref<boolean>(false)

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
    taskStore.addTask(formData.title, formData.desc, formData.microTasks)
  },
}
</script>
