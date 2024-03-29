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
import useProgressColor from '@/composables/useProgressColor'
import { toRef } from 'vue';

const props = defineProps<{
  percentage: number
  title?: string
}>()

const barColor = useProgressColor(toRef(() => props.percentage), 'bg-') 

</script>
