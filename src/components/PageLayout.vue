<template>
  <div :data-id="'PageLayout'" :class="'w-full bg-orange-500'">
    <div
      :data-id="'PageLayout__grid-conatiner'"
      :class="'max-w-screen-2xl min-h-screen mx-auto bg-white grid lg:grid-cols-[90px_1fr_90px] lg:grid-rows-1 grid-rows-[50px_1fr]'"
    >
      <slot :name="'bar'" />
      <div :data-id="'PageLayout__content'" :class="'px-3 pt-5'">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
