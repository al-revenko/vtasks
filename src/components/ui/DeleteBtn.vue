<template>
  <BtnLayout :data-id="`DeleteBtn`" :class="`btn-ghost`">
    <TrashCanSVG :class="`w-full h-full` + color" />
  </BtnLayout>
</template>

<script setup lang="ts">
import BtnLayout from '@/components/layouts/BtnLayout.vue'
import TrashCanSVG from '@/components/svg/TrashCanSVG.vue'

const props = defineProps<{
  color?: 'neutral' | 'white'
}>()

const color =
  props.color === 'white'
    ? ' fill-white hover:fill-slate-200'
    : ' fill-neutral hover:fill-slate-700'
</script>

<style scoped></style>
