<template>
  <div
    data-id="MenuBar"
    :class="`
      lg:w-10/12 lg:h-[90dvh] w-full h-full
      lg:justify-self-center 
      lg:rounded-md bg-zinc-700
      sticky lg:top-[5%] top-0 z-20
      box-border 
    `"
  >
    <div
      :class="`
        h-full 
        flex lg:flex-col justify-between items-center
        lg:pb-5 lg:pt-7 px-2 pb-2 pt-2
      `"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
