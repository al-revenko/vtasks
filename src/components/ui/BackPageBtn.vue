<template>
  <button
    data-id="BackPageBtn"
    :type="'button'"
    :class="`btn btn-square border-none` + colorClasses.btn"
  >
    <BackPageSVG :class="colorClasses.svg"/>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BackPageSVG from '@/components/svg/BackPageSVG.vue'

const props = defineProps<{
  color?: 'neutral' | 'white'
}>()

const colorClasses = computed<{
  btn: string
  svg: string
}>(() => {
  const colors = { svg: '', btn: '' }

  switch (props.color) {
    case 'white':
      colors.btn = ` bg-inherit hover:bg-inherit `
      colors.svg = ` bg-inherit fill-white hover:fill-slate-100 `
      return colors

    default:
      colors.btn = ` bg-white hover:bg-white`
      colors.svg = ` fill-neutral hover:fill-slate-700 `
      return colors
  }
})
</script>

<style scoped></style>
