<template>
  <button
    data-id="EditBtn"
    :type="'button'"
    :class="`btn btn-square btn-outline hover:bg-transparent border-none`"
  >
    <EditSVG :class="`stroke-inherit` + colorClasses" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EditSVG from '@/components/svg/EditSVG.vue';

const props = defineProps<{
  color?: 'neutral' | 'white'
}>()

const colorClasses = computed(() => {
  switch (props.color) {
    case 'white':
      return ' fill-white hover:fill-neutral-100'

    default:
      return ' fill-neutral-700 hover:fill-neutral-500'
  }
})
</script>

