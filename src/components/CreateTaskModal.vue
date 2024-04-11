<template>
  <ModalWindow v-model:is-show="isShowModel">
    <template #head>
      <div :class="'flex justify-between w-full'">
        <h3 :class="'font-semibold'">Создать задачу</h3>
        <button form="createForm" class="btn btn-neutral mx-auto btn-sm text-white" type="submit">
          Готово
        </button>
      </div>
    </template>
    <form
      @submit.prevent="() => (callbacks.onSubmit(), (isShowModel = false))"
      id="createForm"
      :class="`
        min-w-96
        grid grid-cols-1 grid-rows-[repeat(3, max-content)] grid-flow-row gap-4 
        pt-6
      `"
    >
      <label class="input input-bordered flex items-center gap-2 bg-transparent w-full">
        <input
          type="text"
          class="grow"
          placeholder="Имя"
          required
          :maxlength="titleMaxLength"
          v-model="formData.title"
        />
        <span class="badge">{{ formData.title.length + '/' + titleMaxLength }}</span>
      </label>

      <label class="form-control">
        <textarea
          class="textarea textarea-bordered bg-transparent max-h-44"
          placeholder="Описание"
          :maxlength="descMaxLength"
          v-model="formData.desc"
        ></textarea>
        <div class="label">
          <span class="label-text-alt"></span>
          <span class="label-text-alt">{{
            (formData.desc?.length ?? 0) + '/' + descMaxLength
          }}</span>
        </div>
      </label>
    </form>
    <form @submit.prevent="callbacks.onMicroTaskAdd">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Добавить подзадачу</span>
          <span class="label-text">Задач: {{ microTasks.length }}/{{ microTasksMaxCount }}</span>
        </div>
        <div :class="`flex gap-2`">
          <label class="input input-bordered flex items-center gap-2 bg-transparent w-full">
            <input
              type="text"
              class="grow"
              placeholder="Имя подзадачи"
              required
              :maxlength="titleMaxLength"
              v-model="microTaskHeading"
            />
            <span class="badge">{{ microTaskHeading.length + '/' + titleMaxLength }}</span>
          </label>
          <AddBtn type="submit" :class="'btn-md'" />
        </div>
      </label>
      <template v-if="microTasks.length > 0">
        <ul
          :class="`
            mt-5 h-[145px]
            flex flex-col gap-2 
            overflow-y-auto overflow-x-hidden
          `"
        >
          <li
            :class="`
              pr-2
              flex justify-between items-center gap-2
            `"
            v-for="(task, i) in microTasks"
            :key="i"
          >
            <span :class="`text-sm break-words`">{{ task }}</span>
            <CloseBtn
              type="button"
              :class="'btn-xs'"
              @click="() => callbacks.onMicroTasksDelete(i)"
            />
          </li>
        </ul>
      </template>
    </form>
  </ModalWindow>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ModalWindow from '@/components/ui/ModalWindow.vue'
import CloseBtn from '@/components/ui/CloseBtn.vue'
import AddBtn from '@/components/ui/AddBtn.vue'

interface IFormData {
  title: string
  desc?: string
}

const isShowModel = defineModel<boolean>('isShow', { required: true })
const emit = defineEmits(['taskCreated'])

const titleMaxLength = 42
const descMaxLength = 300
const microTasksMaxCount = 16

const formData = ref<IFormData>({ title: '' })
const microTasks = ref<string[]>([])
const microTaskHeading = ref<string>('')

const callbacks = {
  onSubmit: () => {
    emit('taskCreated', {
      ...formData.value,
      microTasks: [...microTasks.value],
    })

    formData.value = { title: '' }
    microTasks.value = []
    microTaskHeading.value = ''
  },

  onMicroTaskAdd() {
    if (microTaskHeading.value.length > 0 && microTasks.value.length < microTasksMaxCount) {
      microTasks.value.push(microTaskHeading.value)
      microTaskHeading.value = ''
    }
  },

  onMicroTasksDelete(index: number) {
    microTasks.value.splice(index, 1)
  },
}
</script>

<style scoped></style>
