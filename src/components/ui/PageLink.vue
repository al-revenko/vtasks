<template>
  <RouterLink
    :class="`
    transition-colors ease-in duration-100 
    fill-slate-500 hover:fill-slate-400`"
    :to="{ name: props.route, params: props.params }"
  >
    <PageSVG />
  </RouterLink>
</template>

<script setup lang="ts">
import type { RouteParams } from 'vue-router'
import PageSVG from '@/components/svg/PageSVG.vue'

const props = defineProps<{
  route?: string
  params?: RouteParams
}>()
</script>
