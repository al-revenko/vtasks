<template>
  <button @click="emit('click', $event)">
    <PlusSVG
      :class="'fill-white hover:fill-slate-100 active:fill-slate-300 transition-all ease-in duration-100'"
    />
  </button>
</template>

<script setup lang="ts">
import PlusSVG from '@/components/svg/PlusSVG.vue'

const emit = defineEmits(['click'])
</script>
