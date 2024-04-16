<template>
  <button
    data-id="DeleteBtn"
    :type="'button'"
    :class="`btn btn-square btn-outline btn-ghost border-none`"
  >
    <div :class="`h-full w-full px-1 py-1`"><TrashCanSVG :class="colorClasses.svg"/></div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TrashCanSVG from '@/components/svg/TrashCanSVG.vue'

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
      colors.svg = ` fill-white hover:fill-slate-100`
      return colors

    default:
      colors.svg = ` fill-neutral hover:fill-slate-600`
      return colors
  }
})
</script>

<style scoped></style>

