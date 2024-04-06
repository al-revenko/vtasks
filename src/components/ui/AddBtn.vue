<template>
  <button
    data-id="AddBtn"
    :type="props.type"
    @click="emit('click')"
    :class="`btn btn-square btn-outline border-none` + colorClasses.btn"
  >
    <PlusSVG :class="colorClasses.svg" />
  </button>
</template>

<script setup lang="ts">
import { computed, type ButtonHTMLAttributes } from 'vue'
import PlusSVG from '@/components/svg/PlusSVG.vue'

const props = defineProps<{
  color?: 'neutral' | 'white'
  type?: ButtonHTMLAttributes['type']
}>()

const colorClasses = computed<{
  btn: string
  svg: string
}>(() => {
  const colors = { svg: '', btn: '' }

  switch (props.color) {
    case 'white':
      colors.svg = ` fill-white hover:fill-slate-100 `
      return colors

    default:
      colors.btn = ` bg-white hover:bg-white border-neutral `
      colors.svg = ` fill-neutral hover:fill-slate-700 `
      return colors
  }
})

const emit = defineEmits(['click'])
</script>
