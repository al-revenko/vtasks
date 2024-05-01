<template>
  <div data-id="TaskContent" :class="`h-full lg:pl-6 pb-8`">
    <header :class="`lg:pt-6`">
      <EditableTitle
        :class="`mx-auto sm:mx-0 sm:max-w-lg max-w-72`"
        placeholder="Имя задачи"
        :max-length="titleMaxLength"
        :required="true"
        v-model="taskModel.title"
      >
        <TitleMain :class="`max-w-full`">{{ taskModel.title }}</TitleMain>
      </EditableTitle>
    </header>
    <main :class="`h-full w-full overflow-x-hidden`">
      <section :class="`pt-6 text-center sm:text-left`">
        <TitleSecond>Время создания</TitleSecond>
        <p :class="`pt-6 lg:pl-4`">{{ createdAt }}</p>
      </section>
      <section :class="`pt-8`">
        <EditableTaskList
          :max-tasks="microTasksMaxCount"
          :placeholder="`Имя подзадачи`"
          :sufix="taskCountSuffix"
          v-model="microTasks"
          @add="callbacks.onMicroTaskAdd"
        >
          <TitleSecond>Подзадачи</TitleSecond>
        </EditableTaskList>
      </section>
      <section :class="`pt-8`">
        <EditableText :class="`h-56 pr-2`" v-model="taskModel.desc" :max-length="descMaxLength">
          <TitleSecond>Описание</TitleSecond>
        </EditableText>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { microTasksMaxCount, titleMaxLength, descMaxLength } from '@/inputConfig'
import type { ITask } from '@/types/task.interface'
import useTimeFormatter from '@/composables/useTimeFormatter'
import usePlural from '@/composables/usePlural'
import TitleMain from '@/components/ui/TitleMain.vue'
import TitleSecond from '@/components/ui/TitleSecond.vue'
import EditableTitle from '@/components/EditableTitle.vue'
import EditableTaskList from '@/components/EditableTaskList.vue'
import EditableText from '@/components/EditableText.vue'

const taskModel = defineModel<ITask>({ required: true })
const emit = defineEmits(['microtaskAdd'])

const microTasks = computed(() => {
  if (taskModel.value.nested) {
    return taskModel.value.nested.tasks
  }

  return []
})

const time = useTimeFormatter(taskModel.value.createdAt, 'D MMMM YYYY HH:mm').value.split(' ')

const createdAt = `${time[0]} ${time[1]} ${time[2]} года, в ${time[3]}`

const taskCountSuffix = computed(() => {
  if (taskModel.value.nested === null) {
    return ''
  }

  const suffixes = {
    zero: 'задач',
    one: 'задача',
    two: 'задачи',
    few: 'задачи',
    many: 'задач',
    other: 'задач',
  }
  const rule = usePlural(taskModel.value.nested.tasks.length).value
  return suffixes[rule]
})

const callbacks = {
  onMicroTaskAdd(title: string) {
    emit('microtaskAdd', title)
  },
}
</script>
