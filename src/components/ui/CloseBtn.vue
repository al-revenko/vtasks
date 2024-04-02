<template>
  <button data-id="CloseBtn" class="btn btn-square btn-outline border-slate-500 text-slate-500  hover:bg-rose-600 hover:border-rose-600 hover:text-white" @click="emit('click')" >
    <CrossSVG />
  </button>
</template>

<script setup lang="ts">
import CrossSVG from '@/components/svg/CrossSVG.vue';
const emit = defineEmits(['click'])
</script>
