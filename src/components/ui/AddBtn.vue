<template>
  <BtnLayout :data-id="'AddBtn'" :class="`rounded-none`" :color="props.color ?? 'neutral'">
    <PlusSVG :class="`w-[80%] h-[80%]`"/>
  </BtnLayout>
</template>

<script setup lang="ts">
import BtnLayout from '@/components/layouts/BtnLayout.vue';
import PlusSVG from '@/components/svg/PlusSVG.vue'

const props = defineProps<{
  color?: 'neutral' | 'white'
}>()
</script>
