<template>
  <BtnLayout :data-id="'DoneBtn'" :color="props.color ?? 'neutral'">
    <CheckMarkSVG :class="`w-full h-full`" />
  </BtnLayout>
</template>

<script setup lang="ts">
import BtnLayout from '@/components/layouts/BtnLayout.vue'
import CheckMarkSVG from '@/components/svg/CheckMarkSVG.vue';
const props = defineProps<{
  color?: 'neutral' | 'white'
}>()
</script>
