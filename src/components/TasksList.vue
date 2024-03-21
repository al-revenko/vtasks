<template>
  <ul :class="'flex gap-5 flex-col'">
    <li v-for="task in tasks" :key="task.createdAt">
      <div :class="'z-10 flex gap-2'">
        <div :class="'pt-0.5'">
          <CheckboxInput v-model="task.isDone" :size="'xs'" />
        </div>
        <span>{{ task.title }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import CheckboxInput from './ui/CheckboxInput.vue'
import type { ITask } from '@/interfaces/task.interface'

const tasks = defineModel<ITask[]>({ required: true })
</script>
