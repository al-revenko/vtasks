<template>
  <button
    :data-id="props.dataId ?? 'btn'"
    :type="'button'"
    :class="`btn btn-square` + colors.btn">
    <div :class="`flex items-center justify-center` + colors.slot">
      <slot />
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  dataId?: string
  color?: 'white' | 'neutral'
}>()

const colors = computed<{
  btn: string
  slot: string
}>(() => {
  const colors = { slot: '', btn: '' }

  switch (props.color) {
    case 'white':
      colors.btn = ` bg-white hover:bg-slate-200`
      colors.slot = ` text-neutral-600 hover:text-neutral-600 `
      return colors

    case 'neutral':
      colors.btn = ` bg-neutral hover:bg-slate-700`
      colors.slot = ` text-white hover:text-white `
      return colors

    default:
      return colors
  }
})
</script>
