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
        grid grid-cols-1 grid-rows-[repeat(3, max-content)] grid-flow-row gap-4 
        pt-6 px-3 w-96
      `"
    >
      <input
        type="text"
        placeholder="Имя"
        class="bg-transparent input input-bordered w-full"
        v-model="formData.title"
      />
      <textarea
        class="textarea textarea-bordered bg-transparent max-h-96"
        placeholder="Описание"
        v-model="formData.desc"
      ></textarea>
      <div>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Добавить подзадачу</span>
            <span class="label-text">Колличесто: {{ microTasks.length }}/16</span>
          </div>
          <div :class="`flex gap-2`">
            <input
              type="text"
              placeholder="Имя подзадачи"
              class="input input-bordered w-full bg-transparent"
              v-model="microTaskHeading"
            />
            <AddBtn type="button" @click="callbacks.onMicroTaskAdd" :class="'btn-md'" />
          </div>
        </label>
      </div>
      <ul :class="`grid grid-col-1 gap-y-2 max-h-28 ` + microTasksScroll " v-if="microTasks.length > 0">
        <li
          :class="`flex justify-between items-center gap-2`"
          v-for="(task, i) in microTasks"
          :key="i"
        >
          <span>{{ task }}</span>
          <CloseBtn
            type="button"
            :class="'btn-xs'"
            @click="() => (callbacks.onMicroTasksDelete(i))"
          />
        </li>
      </ul>
    </form>
  </ModalWindow>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ModalWindow from '@/components/ui/ModalWindow.vue'
import CloseBtn from '@/components/ui/CloseBtn.vue'
import AddBtn from '@/components/ui/AddBtn.vue'

interface IFormData {
  title: string
  desc?: string
}

const isShowModel = defineModel<boolean>('isShow', { required: true })
const emit = defineEmits(['taskCreated'])

const formData = ref<IFormData>({ title: '' })
const microTasks = ref<string[]>([])
const microTaskHeading = ref<string>('')

const microTasksScroll = computed(() => microTasks.value.length > 4 ? ' overflow-y-scroll ' : '')

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
    if (microTaskHeading.value.length > 0) {
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
