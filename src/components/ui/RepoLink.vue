<template>
  <a :class="`flex`" href="https://github.com/al-revenko/vtasks" target="_blank" rel="noopener noreferrer">
    <GitHubSVG
      :class="'transition-colors ease-in duration-100 fill-white hover:fill-slate-300 active:fill-slate-400'"
    />
  </a>
</template>

<script setup lang="ts">
import GitHubSVG from '@/components/svg/GitHubSVG.vue'
</script>
