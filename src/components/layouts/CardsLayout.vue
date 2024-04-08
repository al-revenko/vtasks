<template>
  <div
    :data-id="'CardsLayout'"
    :class="`
      h-full w-full
    `"
  >
    <div
      :data-id="'CardsLayout__grid'"
      :class="`
        grid gap-y-10 gap-x-5
        grid-cols-[repeat(auto-fill,256px)]
        justify-center
      `"
    >
      <slot></slot>
    </div>
  </div>
</template>
