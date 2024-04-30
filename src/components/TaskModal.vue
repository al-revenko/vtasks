<template>
  <ModalWindow
    v-if="props.desc || nestedDataModel"
    data-id="TaskModal"
    v-model:is-show="isShowModel"
  >
    <template #head>
      <div :class="'flex gap-2 items-center'">
        <CheckboxInput
          v-model="isDoneModel"
          @change="(value: boolean) => emit('statusChange', { id: props.id, status: value })"
        />
        <TitleSecond>{{ props.title }}</TitleSecond>
        <DeleteBtn :class="`btn-xs`" @click="callbacks.onDelete" />
      </div>
      <div :class="'flex items-center gap-3 ml-auto'">
        <ProgressBar v-if="nestedDataModel" :class="'h-3 w-20 mx-2'" :percentage="percentage" />
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
      <template v-if="nestedDataModel">
        <div :class="'pt-5'">
          <TasksList v-model="nestedDataModel.tasks" :class="'grid grid-cols-4 gap-2'" />
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
      <DeleteBtn :class="`btn-xs`" @click="callbacks.onDelete" />
    </div>
  </ModalWindow>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import usePercentage from '@/composables/usePercentage'
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

const nestedDataModel = defineModel<{
  doneCount: number
  tasks: {
    id: number
    title: string
    isDone: boolean
  }[]
} | null>('nestedData', { required: true })

const emit = defineEmits(['statusChange', 'task-delete'])

const percentage = usePercentage(nestedDataModel as Ref)

const callbacks = {
  onDelete() {
    emit('task-delete', props.id)
    isShowModel.value = false
  },
}
</script>
