<template>
  <OverlayLayout :is-show="isShowModel">
    <ModalLayout v-model:window-close="isShowModel">
      <template #head>
        <div :class="'flex justify-between items-center w-full mr-5'">
          <TitleSecond>Создать задачу</TitleSecond>
          <button form="createForm" class="btn btn-neutral mx-auto btn-sm text-white" type="submit">
            Готово
          </button>
          <PageLink route="create" class="h-7 w-7" />
        </div>
      </template>
      <form
        data-id="TaskFormModal"
        id="createForm"
        :class="`
          w-[480px] max-h-[544px]
          grid grid-cols-1 grid-rows-[repeat(3, max-content)] grid-flow-row gap-4 
          pt-6
        `"
        @submit.prevent="() => (callbacks.onSubmit(), (isShowModel = false))"
      >
        <InputData
          type="text"
          :max-length="titleMaxLength"
          placeholder="Имя задачи"
          required
          v-model="formData.title"
        />
        <InputArea
          class="h-44"
          placeholder="Описание"
          :max-length="descMaxLength"
          v-model="formData.desc"
        />
        <InputList
          :class="`max-h-64`"
          title="Добавить подзадачу"
          :items-maxcount="microTasksMaxCount"
          :input-maxlength="titleMaxLength"
          v-model="microTasks"
        />
      </form>
    </ModalLayout>
  </OverlayLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { titleMaxLength, descMaxLength, microTasksMaxCount } from '@/inputConfig'
import OverlayLayout from '@/components/layouts/OverlayLayout.vue'
import ModalLayout from '@/components/layouts/ModalLayout.vue'
import InputData from '@/components/ui/InputData.vue'
import InputArea from '@/components/ui/InputArea.vue'
import InputList from '@/components/ui/InputList.vue'
import TitleSecond from '@/components/ui/TitleSecond.vue'
import PageLink from '@/components/ui/PageLink.vue'

interface IFormData {
  title: string
  desc: string
}

const isShowModel = defineModel<boolean>('isShow', { required: true })
const emit = defineEmits(['taskCreated'])

const formData = ref<IFormData>({ title: '', desc: '' })
const microTasks = ref<string[]>([])

const callbacks = {
  onSubmit: () => {
    emit('taskCreated', {
      ...formData.value,
      microTasks: [...microTasks.value],
    })

    formData.value = { title: '', desc: '' }
    microTasks.value = []
  },
}
</script>

<style scoped></style>
