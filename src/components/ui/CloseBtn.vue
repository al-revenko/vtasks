<template>
  <BtnLayout
    :data-id="`CloseBtn`"
    :class="`
    btn-outline 
    hover:bg-rose-600  
    border-slate-500 hover:border-rose-600
    text-slate-500 hover:text-white`"
  >
    <CrossSVG :class="`w-full h-full`" />
  </BtnLayout>
</template>

<script setup lang="ts">
import BtnLayout from '@/components/layouts/BtnLayout.vue'
import CrossSVG from '@/components/svg/CrossSVG.vue'
</script>
