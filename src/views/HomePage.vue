<template>
  <PageLayout>
    <template #bar>
      <MenuBar />
    </template>
    <CardsLayout>
      <template v-for="task in tasks" :key="task.id">
        <TaskCard
          v-if="isMacroTask(task)"
          :id="task.id"
          :title="task.title"
          :desc="task.desc"
          @m-tasks-update="collbacks.onMacroTaskUpdate"
          v-model:is-done="task.isDone"
          v-model:nested-data="task.nestedData"
        />
        <TaskCard
          v-else
          :id="task.id"
          :title="task.title"
          :desc="task.desc"
          v-model:is-done="task.isDone"
        />
      </template>
    </CardsLayout>
  </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import MenuBar from '@/components/MenuBar.vue'
import CardsLayout from '@/components/CardsLayout.vue'
import TaskCard from '@/components/TaskCard.vue'
import useTaskStore from '@/stores/task.store'
import isMacroTask from '@/guards/isMacroTask.guard'

const taskStore = useTaskStore()

const collbacks = {
  onMacroTaskUpdate(id: number) {
    taskStore.updateMacroTask(id)
  } 
}

const tasks = taskStore.$state.tasks

</script>
