<template>
  <BtnLayout :data-id="`BackBtn`" :class="`rounded-none`" :color="props.color ?? 'neutral'">
    <BackSVG :class="`w-[85%] h-[85%]`"/>
  </BtnLayout>
</template>

<script setup lang="ts">
import BtnLayout from '@/components/layouts/BtnLayout.vue';
import BackSVG from '@/components/svg/BackSVG.vue'

const props = defineProps<{
  color?: 'neutral' | 'white'
}>()
</script>

<style scoped></style>
