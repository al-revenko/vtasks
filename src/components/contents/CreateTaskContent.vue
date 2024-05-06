<template>
  <ContentLayout class="overflow-hidden">
    <template #header>
      <TitleMain> Создать задачу </TitleMain>
    </template>
    <form @submit.prevent="callbacks.onSubmit" :class="`px-1 grid grid-cols-1 gap-4`">
      <InputData title="Имя задачи" type="text" :max-length="titleMaxLength" required v-model="taskTitle" />
      <InputArea class="h-60" title="Описание задачи"  :max-length="descMaxLength" v-model="taskDesc" />
      <InputList
        class="max-h-80"
        title="Добавить подзадачу"
        :input-maxlength="titleMaxLength"
        :items-maxcount="microTasksMaxCount"
        v-model="taskMicrotasks"
      />
      <button class="btn btn-neutral font-medium text-white text-lg">Готово</button>
    </form>
  </ContentLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { titleMaxLength, descMaxLength, microTasksMaxCount } from '@/inputConfig'
import ContentLayout from '@/components/layouts/ContentLayout.vue'
import TitleMain from '@/components/ui/TitleMain.vue'
import InputData from '@/components/ui/InputData.vue'
import InputArea from '@/components/ui/InputArea.vue'
import InputList from '@/components/ui/InputList.vue'

const emit = defineEmits<{
  (e: 'taskCreated', task: {
    title: string
    desc: string
    microTasks: string[]
  }): void
}>()

const taskTitle = ref<string>('')
const taskDesc = ref<string>('')
const taskMicrotasks = ref<string[]>([])

const callbacks = {
  onSubmit() {
    emit('taskCreated', {
      title: taskTitle.value,
      desc: taskDesc.value,
      microTasks: taskMicrotasks.value
    })

    taskTitle.value = ''
    taskDesc.value = ''
    taskMicrotasks.value = []
  }
}
</script>