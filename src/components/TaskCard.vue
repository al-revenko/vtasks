<template>
  <template v-if="props.desc || hasTasks">
    <button
      data-id="TaskCard"
      :class="`
        max-h-72
        pt-3 pl-3 pr-2 pb-3
        grid grid-cols-1 grid-rows-[max-content_1fr] gap-3 
        transition-all ease-in duration-200 
        bg-white border rounded-md shadow-[0px_1px_5px_1px]
        text-start 
        overflow-hidden
        ` + shadowColor
      "
      @click="emit('click', props.id)"
    >
      <div :class="'flex items-start justify-between gap-3 max-w-full'">
        <h3 :class="'text-lg font-medium break-words max-w-full'">{{ props.title }}</h3>
        <div :class="'pt-1'">
          <CheckboxInput @click.stop v-if="!hasTasks" v-model="isDoneModel" :size="'lg'" />
        </div>
      </div>
  
      <template v-if="macroTaskData && hasTasks">
        <div :class="'pl-1 pr-5'">
          <TasksList
            :class="'flex gap-1 flex-col flex-wrap h-44 overflow-hidden'"
            v-model="macroTaskData.tasks"
          />
        </div>
        <div :class="'h-6 pb-2'">
          <ProgressBar :percentage="donePercentage" :title="donePercentage + '%'" />
        </div>
      </template>
  
      <template v-else>
        <div :class="'fade max-w-full h-full break-words overflow-hidden'">
          <p v-if="props.desc">
            {{ props.desc }}
          </p>
        </div>
      </template>
    </button>
  </template>
  <template v-else>
    <button
      data-id="TaskCard"
      :href="'/'"
      :class="
        `flex justify-center items-center 
        h-72 w-64 pt-3 pl-3 pr-2 pb-3 
        transition-all ease-in duration-200 
        bg-white border rounded-md shadow-[0px_1px_8px_1px]
        overflow-hidden
        ` + shadowColor
      "
      @click="emit('click', props.id)"
    >
      <div :class="'flex items-start justify-between gap-3 max-w-full'">
        <h3 :class="'text-lg font-medium break-words max-w-full h-max'">{{ props.title }}</h3>
        <div :class="'pt-1'">
          <CheckboxInput @click.stop v-if="!hasTasks" v-model="isDoneModel" :size="'lg'" />
        </div>
      </div>
    </button>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TasksList from '@/components/TasksList.vue'
import CheckboxInput from '@/components/ui/CheckboxInput.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import useMacroTaskMeta from '@/composables/useMacroTaskMeta'

const props = defineProps<{
  id: number
  title: string
  desc?: string
}>()

const isDoneModel = defineModel<boolean>('isDone', { required: true })

const macroTaskDataModel = defineModel<{
  doneCount: number
  tasks: {
    id: number
    title: string
    isDone: boolean
  }[]
}>('macroTaskData', {
  default: {
    tasks: [],
    doneCount: 0,
  },
})

const { hasTasks, donePercentage } = useMacroTaskMeta(macroTaskDataModel)

const emit = defineEmits(['click'])

const shadowColor = computed(() =>
  isDoneModel.value
    ? ' shadow-lime-600/65 hover:shadow-lime-600/90'
    : ' shadow-slate-300 hover:shadow-rose-500',
)
</script>
