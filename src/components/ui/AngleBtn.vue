<template>
  <button
    data-id="AngleBtn"
    :type="'button'"
    :class="
      style +
      ' absolute cursor-pointer transition-colors ease-in duration-100 bottom-[-7px] right-[-27px] w-0 h-0 rotate-[135deg]  border-l-[40px] border-l-transparent border-b-[40px]  border-r-[40px] border-r-transparent'
    "
  >
    <div :class="'absolute rotate-[225deg] w-5 h-5 left-[-10px] top-3'">
      <slot />
    </div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ 
  color: 'red' | 'lime' 
}>()

let style: string

switch (props.color) {
  case 'red':
    style = 'border-b-red-600 hover:border-b-red-500 active:border-b-red-700'
    break
  case 'lime':
    style = 'border-b-lime-600 hover:border-b-lime-500 active:border-b-lime-700'
    break
}
</script>
