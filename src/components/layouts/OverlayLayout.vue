<template>
  <div
    data-id="OverlayLayout"
    :class="`
      h-dvh w-dvw
      flex items-center justify-center 
      fixed left-0 top-0 z-50
      backdrop-blur-sm
    `"
    v-show="props.isShow"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import useDisableScroll from '@/composables/useDisableScroll'

const props = defineProps<{
  isShow: boolean
}>()

useDisableScroll(toRef(props, 'isShow'))
</script>
