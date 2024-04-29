<template>
  <template v-if="props.desc || nestedDataModel">
    <button
      data-id="TaskCard"
      :class="
        `
        max-h-72
        py-3 px-3
        grid grid-cols-1 grid-rows-[max-content_1fr] gap-2 
        transition-all ease-in duration-200 
        bg-white border rounded-md shadow-[0px_1px_5px_1px]
        text-start 
        overflow-hidden
        ` + shadowColor
      "
      @click="emit('click', props.id)"
    >
      <div :class="'flex justify-between gap-3 max-w-full'">
        <TitleSecond :class="'min-w-0'">{{ props.title }}</TitleSecond>
        <div :class="'pt-1'">
          <CheckboxInput @click.stop v-if="!nestedDataModel" v-model="isDoneModel" />
        </div>
      </div>

      <template v-if="nestedDataModel">
        <div :class="'pl-1 pr-5'">
          <TasksList
            :class="`
              max-h-44 
              flex flex-col flex-wrap gap-1
              overflow-hidden
            `"
            v-model="nestedDataModel.tasks"
          />
        </div>
        <ProgressBar :class="`h-4`" :percentage="percentage" :title="percentage + '%'" />
      </template>
      <template v-else>
        <div v-if="props.desc" :class="'fade max-w-full h-full overflow-hidden'">
          <TextP>
            {{ props.desc }}
          </TextP>
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
        h-72 w-64 py-3 px-3 
        transition-all ease-in duration-200 
        bg-white border rounded-md shadow-[0px_1px_8px_1px]
        overflow-hidden
        ` + shadowColor
      "
      @click="emit('click', props.id)"
    >
      <div :class="'flex flex-col gap-3 justify-center items-center max-w-full'">
        <TitleSecond :class="'max-w-56'">{{ props.title }}</TitleSecond>
        <CheckboxInput @click.stop v-if="!nestedDataModel" v-model="isDoneModel" />
      </div>
    </button>
  </template>
</template>

<script setup lang="ts">
import { computed, type Ref } from 'vue'
import usePercentage from '@/composables/usePercentage'
import TasksList from '@/components/TasksList.vue'
import CheckboxInput from '@/components/ui/CheckboxInput.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import TitleSecond from '@/components/ui/TitleSecond.vue'
import TextP from '@/components/ui/TextP.vue'

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
} | null>('nestedData', { required: true })

const percentage = usePercentage(nestedDataModel as Ref)

const emit = defineEmits(['click'])

const shadowColor = computed(() =>
  isDoneModel.value
    ? ' shadow-lime-600/65 hover:shadow-lime-600/90'
    : ' shadow-slate-300 hover:shadow-rose-500',
)
</script>
