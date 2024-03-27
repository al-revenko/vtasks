<template>
  <ul :class="'flex gap-3 flex-col'">
    <li v-for="task in tasks" :key="task.id">
      <div :class="'z-10 flex gap-1.5'">
        <div>
          <CheckboxInput @change="emit('taskChange', task.id)" v-model="task.isDone" :size="'xs'" />
        </div>
        <span :class="'text-sm'">{{ task.title }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import CheckboxInput from './ui/CheckboxInput.vue'

const tasks = defineModel<
  {
    id: number
    title: string
    isDone: boolean
  }[]
>({ required: true })

const emit = defineEmits(['taskChange'])

</script>
