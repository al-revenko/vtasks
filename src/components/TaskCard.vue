<template>
  <a
    data-id="TaskCard"
    :href="'#'"
    :class="
      `grid grid-rows-[max-content_1fr] gap-3 h-72 w-64 pt-3 pl-3 pr-2 pb-3 transition-all ease-in duration-200 bg-white border rounded-md shadow-[-1px_2px_6px_1px]` +
      ' ' +
      shadowColor
    "
    @click="emit('click', props.id)"
  >
    <div :class="'flex items-start justify-between gap-3'">
      <h3 :class="'text-lg font-medium'">{{ props.title }}</h3>
      <div :class="'pt-1'">
        <CheckboxInput v-if="!hasTasksArray" v-model="isDoneModel" :size="'lg'" />
      </div>
    </div>

    <template v-if="hasTasksArray">
      <div :class="'max-h-44 pl-1 pr-5'">
        <TasksList
          :class="'h-full justify-center flex-wrap overflow-hidden'"
          @task-change="emit('mTasksUpdate', props.id)"
          v-model="nestedDataModel.tasks"
        />
      </div>
      <div :class="'min-h-6 pb-2'">
        <ProgressBar :percentage="percentage" :title="percentage + '%'" />
      </div>
    </template>

    <template v-else>
      <div :class="'fade overflow-hidden'">
        <p v-if="props.desc">
          {{ props.desc }}
        </p>
      </div>
    </template>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TasksList from '@/components/TasksList.vue'
import CheckboxInput from '@/components/ui/CheckboxInput.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'

const props = defineProps<{
  id: number
  title: string
  desc?: string
}>()

const isDoneModel = defineModel<boolean>('isDone', { required: true })

const nestedDataModel = defineModel<{
  doneCount: number
  tasks: {
    id: number
    title: string
    isDone: boolean
  }[]
}>('nestedData', {
  default: {
    tasks: [],
    doneCount: 0,
  },
})

const tasksCount = nestedDataModel.value.tasks.length
const hasTasksArray = computed(() => tasksCount > 0)

const percentage = computed(() => {
  const doneCount = nestedDataModel.value.doneCount

  if (hasTasksArray.value && doneCount > 0) {
    return Math.floor((doneCount / tasksCount) * 100)
  }

  return 0
})

const emit = defineEmits(['mTasksUpdate', 'click'])

const shadowColor = computed(() =>
  isDoneModel.value
    ? 'shadow-lime-600/65 hover:shadow-lime-600/90'
    : 'shadow-red-500/65 hover:shadow-red-500/90',
)
</script>
