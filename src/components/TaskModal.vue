<template>
  <OverlayLayout :is-show="isShowModel">
    <ModalLayout
      v-if="props.desc || nestedDataModel"
      class="w-[785px]"
      v-model:window-close="isShowModel"
    >
      <template #head>
        <div :class="'flex gap-2 items-center'">
          <CheckboxInput
            v-model="isDoneModel"
            @change="(value: boolean) => emit('statusChange', { id: props.id, status: value })"
          />
          <TitleSecond class="max-w-96">{{ props.title }}</TitleSecond>
          <DeleteBtn :class="`btn-xs`" @click="callbacks.onDelete" />
        </div>
        <div :class="'flex items-center gap-3 ml-auto mr-6'">
          <ProgressBar v-if="nestedDataModel" :class="'h-3 w-20 mx-2'" :percentage="percentage" />
          <PageLink
            class="w-6 h-6"
            route="task"
            :params="{ id: props.id.toString() }"
            @click="() => (isShowModel = false)"
          />
        </div>
      </template>
      <div
        data-id="TaskModal"
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
        <TextP :class="`pt-5`" v-if="props.desc">
          {{ desc }}
        </TextP>
      </div>
    </ModalLayout>

    <ModalLayout v-else class="w-96 h-56" v-model:window-close="isShowModel">
      <template #head>
        <CheckboxInput
          class="checkbox-lg"
          v-model="isDoneModel"
          @change="(value: boolean) => emit('statusChange', { id: props.id, status: value })"
        />
        <PageLink
          route="task"
          :params="{ id: props.id.toString() }"
          :class="' h-7 w-7 transition-colors ease-in duration-100 fill-slate-500 hover:fill-slate-400'"
          @click="() => (isShowModel = false)"
        />
      </template>
      <div
        data-id="TaskModal"
        :class="'pb-2 h-full flex flex-col gap-2 items-center justify-between'"
      >
        <TitleSecond class="my-auto max-w-full">{{ props.title }}</TitleSecond>
        <DeleteBtn :class="`mx-auto btn-sm`" @click="callbacks.onDelete" />
      </div>
    </ModalLayout>
  </OverlayLayout>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import usePercentage from '@/composables/usePercentage'
import OverlayLayout from '@/components/layouts/OverlayLayout.vue'
import ModalLayout from '@/components/layouts/ModalLayout.vue'
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
