<template>
  <PageLayout>
    <template #bar>
      <MenuBar />
    </template>
    <CardsLayout>
      <template v-for="task in tasks" :key="task.id">
        <TaskCard
          v-if="isMacroTask(task)"
          v-bind="task"
          v-model:is-done="task.isDone"
          v-model:macro-task-data="task.nestedData"
        />
        <TaskCard
          v-else
          v-bind="task"
          v-model:is-done="task.isDone"
        />
      </template>
    </CardsLayout>
  </PageLayout>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task.store'
import isMacroTask from '@/guards/isMacroTask.guard'
import PageLayout from '@/components/layouts/PageLayout.vue'
import CardsLayout from '@/components/layouts/CardsLayout.vue'
import MenuBar from '@/components/MenuBar.vue'
import TaskCard from '@/components/TaskCard.vue'

const taskStore = useTaskStore()

const tasks = taskStore.$state.tasks
</script>
