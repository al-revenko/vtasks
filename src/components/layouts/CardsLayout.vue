<template>
  <div :data-id="'CardsLayout'" :class="'flex justify-center'">
    <div
      :data-id="'CardsLayout__grid'"
      :class="'grid gap-10 grid-cols-[max-content_max-content_max-content_max-content]'"
    >
      <slot></slot>
    </div>
  </div>
</template>
