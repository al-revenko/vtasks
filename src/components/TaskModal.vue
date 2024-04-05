<template>
  <ModalWindow v-if="props.desc || hasTasks" data-id="TaskModal" v-model:is-show="isShowModel">
    <template #head>
      <div :class="'flex gap-3 items-center'">
        <CheckboxInput
          v-model="isDoneModel"
          @change="(value: boolean) => emit('statusChange', { id: props.id, status: value })"
          :size="'md'"
        />
        <h2 :class="'text-slate-600'">{{ props.title }}</h2>
      </div>
      <div :class="'flex items-center gap-3 ml-auto'">
        <div v-if="hasTasks" :class="'h-3 w-20 mr-5'">
          <ProgressBar :percentage="donePercentage" />
        </div>
        <PageLink
          :class="'h-6 w-6 mr-5 transition-colors ease-in duration-100 fill-slate-500 hover:fill-slate-400'"
          @click="() => (isShowModel = false)"
        />
      </div>
    </template>
    <div :class="'flex flex-col w-[750px] max-h-[450px] overflow-hidden'">
      <template v-if="hasTasks">
        <div :class="'pt-5'">
          <TasksList v-model="macroTaskDataModel.tasks" :class="'grid grid-cols-4 gap-2'" />
        </div>
      </template>
      <p :class="'text-slate-600 pt-5 pr-8 break-words max-w-full'" v-if="props.desc">{{ desc }}</p>
      <AngleBtn :color="'red'" @click="callbacks.onDelete">
        <TrashCanSVG :class="'fill-white w-4 h-4'" />
      </AngleBtn>
    </div>
  </ModalWindow>

  <ModalWindow v-else data-id="TaskModal" v-model:is-show="isShowModel">
    <template #head>
      <PageLink
        :class="'h-7 w-7 transition-colors ease-in duration-100 fill-slate-500 hover:fill-slate-400'"
        @click="() => (isShowModel = false)"
      />
    </template>
    <div :class="'flex m-10 gap-2 items-center'">
      <CheckboxInput
        v-model="isDoneModel"
        @change="(value: boolean) => emit('statusChange', { id: props.id, status: value })"
        :size="'md'"
      />
      <h2 :class="'text-slate-600'">{{ props.title }}</h2>
    </div>
    <AngleBtn :color="'red'" @click="callbacks.onDelete">
      <TrashCanSVG :class="'fill-white w-4 h-4'" />
    </AngleBtn>
  </ModalWindow>
</template>

<script setup lang="ts">
import useMacroTaskMeta from '@/composables/useMacroTaskMeta'
import ModalWindow from '@/components/ui/ModalWindow.vue'
import TasksList from '@/components/TasksList.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import PageLink from '@/components/ui/PageLink.vue'
import CheckboxInput from '@/components/ui/CheckboxInput.vue'
import AngleBtn from '@/components/ui/AngleBtn.vue'
import TrashCanSVG from '@/components/svg/TrashCanSVG.vue'

const props = defineProps<{
  id: number
  title: string
  desc?: string
}>()

const isDoneModel = defineModel<boolean>('isDone', { required: true })

const isShowModel = defineModel<boolean>('isShow', {
  required: true,
})

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

const emit = defineEmits(['statusChange', 'task-delete'])

const callbacks = {
  onDelete() {
    emit('task-delete', props.id)
    isShowModel.value = false
  },
}

const { hasTasks, donePercentage } = useMacroTaskMeta(macroTaskDataModel)
</script>
