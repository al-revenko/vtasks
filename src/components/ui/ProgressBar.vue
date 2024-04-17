<template>
  <div data-id="ProgressBar" class="bg-gray-200 rounded-full dark:bg-gray-300">
    <div
      :class="
        'flex justify-center items-center h-full transition-all ease-in duration-700  font-medium text-white text-xs p-0.5 leading-none rounded-full' +
        ' ' +
        barColor
      "
      :style="gutterDirection + props.percentage + '%'"
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
  isVertical?: boolean 
}>()

const gutterDirection = computed(() => props.isVertical ? 'height: ' : 'width: ')

const barColor = computed(() => {
  if (props.percentage === 0) {
    return ''
  }

  if (props.percentage <= 20) {
    return 'bg-red-800'
  }

  if (props.percentage <= 40) {
    return 'bg-orange-600'
  }

  if (props.percentage <= 60) {
    return 'bg-amber-500'
  }

  if (props.percentage <= 80) {
    return 'bg-yellow-400'
  }

  if (props.percentage <= 90) {
    return 'bg-lime-400'
  }

  if (props.percentage < 100) {
    return 'bg-lime-500'
  }

  return 'bg-lime-600'
})
</script>
