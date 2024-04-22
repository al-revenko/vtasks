<template>
  <ModalWindow
    v-if="props.desc || macroTaskMeta.hasTasks"
    data-id="TaskModal"
    v-model:is-show="isShowModel"
  >
    <template #head>
      <div :class="'flex gap-3 items-center'">
        <CheckboxInput
          v-model="isDoneModel"
          @change="(value: boolean) => emit('statusChange', { id: props.id, status: value })"
        />
        <TitleSecond>{{ props.title }}</TitleSecond>
        <DeleteBtn :class="`btn-xs`" @click="callbacks.onDelete"/>
      </div>
      <div :class="'flex items-center gap-3 ml-auto'">
        <ProgressBar
          v-if="macroTaskMeta.hasTasks"
          :class="'h-3 w-20 mr-5'"
          :percentage="macroTaskMeta.donePercentage || 0"
        />
        <PageLink
          :route="'task'"
          :params="{ id: props.id.toString() }"
          @click="() => (isShowModel = false)"
        />
      </div>
    </template>
    <div
      :class="`
        md:w-[750px] md:max-h-[450px] w-full h-full
        flex flex-col 
      `"
    >
      <template v-if="macroTaskMeta.hasTasks">
        <div :class="'pt-5'">
          <TasksList v-model="macroTaskDataModel.tasks" :class="'grid grid-cols-4 gap-2'" />
        </div>
      </template>
      <TextP :class="`pt-5 pr-8`" v-if="props.desc">
        {{ desc }}
      </TextP>
    </div>
  </ModalWindow>

  <ModalWindow v-else data-id="TaskModal" v-model:is-show="isShowModel">
    <template #head>
      <PageLink
        :route="'task'"
        :params="{ id: props.id.toString() }"
        :class="'h-7 w-7 transition-colors ease-in duration-100 fill-slate-500 hover:fill-slate-400'"
        @click="() => (isShowModel = false)"
      />
    </template>
    <div :class="'flex m-10 gap-2 items-center justify-center'">
      <CheckboxInput
        v-model="isDoneModel"
        @change="(value: boolean) => emit('statusChange', { id: props.id, status: value })"
      />
      <TitleSecond>{{ props.title }}</TitleSecond>
      <DeleteBtn :class="`btn-xs`" @click="callbacks.onDelete"/>
    </div>
  </ModalWindow>
</template>

<script setup lang="ts">
import useMacroTaskMeta from '@/composables/useMacroTaskMeta'
import ModalWindow from '@/components/ui/ModalWindow.vue'
import TasksList from '@/components/TasksList.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import PageLink from '@/components/ui/PageLink.vue'
import CheckboxInput from '@/components/ui/CheckboxInput.vue'
import DeleteBtn from '@/components/ui/DeleteBtn.vue'
import TitleSecond from '@/components/ui/TitleSecond.vue'
import TextP from '@/components/ui/TextP.vue'

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

const macroTaskMeta = useMacroTaskMeta(macroTaskDataModel)
</script>
