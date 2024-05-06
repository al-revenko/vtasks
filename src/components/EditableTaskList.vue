<template>
  <div data-id="EditableTaskList">
    <div v-if="!isEdit" :class="`pb-8 flex gap-2 justify-between items-center`">
      <div :class="`flex gap-2 items-center`">
        <slot />
        <AddBtn
          v-if="listModel.length < props.maxTasks"
          :class="`btn-xs`"
          @click="() => (isEdit = true)"
        />
      </div>
      <span v-if="listModel.length > 0">
        {{ tasksCountString }}
      </span>
    </div>
    <form
      v-else
      :class="`
        sm:pl-2 pb-8
        w-full
        grid sm:grid-cols-[min-content_384px_min-content_1fr] grid-cols-[min-content_1fr_min-content] gap-2 items-center
      `"
      @submit.prevent="callbacks.onTaskAdd"
    >
      <CloseBtn
        :class="`
          btn-sm 
          order-2 sm:order-none
        `"
        @click="() => (isEdit = false)"
      />
      <label
        :class="`
          input input-bordered input-sm
          col-span-3 sm:col-auto
          flex items-center gap-2
          bg-transparent 
        `"
      >
        <input
          type="text"
          class="grow"
          :placeholder="props.placeholder"
          required
          :maxlength="titleMaxLength"
          :minlength="1"
          v-model="newTaskTitle"
        />
        <span class="badge badge-neutral">{{ newTaskTitle.length + ' / ' + titleMaxLength }}</span>
      </label>
      <AddBtn
        type="submit"
        :class="`
          order-4 sm:order-none
          btn-sm 
        `"
      />
      <span :class="`order-3 text-center sm:text-right`">
        {{ tasksCountString }}
      </span>
    </form>
    <template v-if="listModel.length > 0">
      <ul
        :class="`
          lg:pl-4
          grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-center
        `"
      >
        <li :class="`h-14 flex items-center gap-2`" v-for="task in listModel" :key="task.id">
          <CheckboxInput :class="`checkbox-lg lg:checkbox-md`" v-model="task.isDone" />
          <span :class="`text-sm break-words max-w-full min-w-0`">{{ task.title }}</span>
          <CloseBtn
            :class="`ml-auto btn-sm lg:btn-xs`"
            @click="() => callbacks.onTaskDelete(task.id)"
          />
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { titleMaxLength } from '@/inputConfig'
import CheckboxInput from '@/components/ui/CheckboxInput.vue'
import CloseBtn from '@/components/ui/CloseBtn.vue'
import AddBtn from '@/components/ui/AddBtn.vue'

const props = defineProps<{
  placeholder?: string
  maxTasks: number
  sufix?: string
}>()
const listModel = defineModel<
  {
    id: number
    title: string
    isDone: boolean
  }[]
>({ required: true })
const emit = defineEmits(['add', 'delete'])

const isEdit = ref<boolean>(false)
const newTaskTitle = ref<string>('')

const tasksCountString = computed(() => {
  if (props.maxTasks && listModel.value.length > 0) {
    const { length } = listModel.value
    return `${length} ${props.sufix ?? ''} / ${props.maxTasks}`
  }
  return ``
})

const callbacks = {
  onTaskAdd() {
    if (newTaskTitle.value.length > 0 && listModel.value.length < props.maxTasks) {
      emit('add', newTaskTitle.value)
      newTaskTitle.value = ''
      if (listModel.value.length === props.maxTasks) {
        isEdit.value = false
      }
    }
  },

  onTaskDelete(id: number) {
    const idx = listModel.value.findIndex((task) => task.id === id)

    if (idx !== -1) {
      listModel.value.splice(idx, 1)
    }
  },
}
</script>
