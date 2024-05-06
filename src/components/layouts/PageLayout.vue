<template>
  <div :data-id="'PageLayout'" :class="'w-screen bg-slate-50'">
    <div
      :data-id="'PageLayout__grid-conatiner'"
      :class="`
        max-w-screen-2xl min-h-screen 
        mx-auto grid 
        lg:grid-cols-[120px_1fr_120px] lg:grid-rows-1 grid-rows-[50px_1fr]
      `"
    >
      <slot :name="'bar'" />
      <div :data-id="'PageLayout__content'" :class="'max-w-full overflow-x-hidden  px-3 py-5'">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
