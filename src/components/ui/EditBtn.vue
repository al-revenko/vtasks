<template>
  <BtnLayout :data-id="`EditBtn`" :class="`btn-ghost hover:bg-transparent`">
    <EditSVG :class="`w-full h-full` + color" />
  </BtnLayout>
</template>

<script setup lang="ts">
import BtnLayout from '@/components/layouts/BtnLayout.vue'
import EditSVG from '@/components/svg/EditSVG.vue'

const props = defineProps<{
  color?: 'neutral' | 'white'
}>()

const color =
  props.color === 'white'
    ? ' text-white hover:text-neutral-100'
    : ' text-neutral hover:text-slate-700'
</script>
