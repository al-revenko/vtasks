<template>
  <div data-id="ProgressBar" class="w-full h-full bg-gray-200 rounded-full dark:bg-gray-300">
    <div
      :class="
        'h-full transition-all ease-in duration-700 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full' +
        ' ' +
        barColor
      "
      :style="'width: ' + props.percentage + '%'"
    >
      {{ percentage >= 10 ? props.title : null }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  percentage: number
  title?: string
}>()

const barColor = computed(() => {
  const percentage = props.percentage
  
  if (percentage === 0) {
    return ''
  }

  if (percentage <= 20) {
    return 'bg-red-800'
  }
  
  if (percentage <= 40) {
    return 'bg-orange-600'
  }
  
  if (percentage <= 60) {
    return 'bg-amber-500'
  }
  
  if (percentage <= 80) {
    return 'bg-yellow-400'
  }
  
  if (percentage <= 90) {
    return 'bg-lime-500'
  }

  if (percentage < 100) {
    return 'bg-lime-600'
  }

  return 'bg-green-600'
})
</script>
