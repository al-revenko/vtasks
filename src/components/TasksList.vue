<template>
  <ul data-id="TaskList" >
    <li :class="'w-full'" data-id="TaskList__item" v-for="task in tasks" :key="task.id">
      <div :class="'flex gap-2 items-center min-h-10'">
          <CheckboxInput
            :tabindex="-1"
            :class="`checkbox-sm`"
            @change="(value: boolean) => emit('statusChange', { id: task.id, status: value })"
            @click.stop
            v-model="task.isDone"
          />
        <span :class="'text-xs max-w-[85%] break-words'">{{ task.title }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import CheckboxInput from '@/components/ui/CheckboxInput.vue'

const tasks = defineModel<
  {
    id: number
    title: string
    isDone: boolean
  }[]
>({ required: true })

const emit = defineEmits(['statusChange'])
</script>
