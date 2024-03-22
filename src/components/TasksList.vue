<template>
  <ul :class="'flex gap-3 flex-col'">
    <li v-for="task in tasks" :key="task.createdAt">
      <div :class="'z-10 flex gap-1.5'">
        <div >
          <CheckboxInput v-model="task.isDone" :size="'xs'" />
        </div>
        <span :class="'text-sm'">{{ task.title }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import CheckboxInput from './ui/CheckboxInput.vue'
import type { ITask } from '@/interfaces/task.interface'

const tasks = defineModel<ITask[]>({ required: true })
</script>
