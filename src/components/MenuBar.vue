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
    <div :class="`
    h-full 
    lg:pb-5 lg:pt-7 px-2 pb-2 pt-2
    flex lg:flex-col items-center justify-between 
    `">
      <div :class="`
      lg:w-fit w-full
      flex lg:flex-col items-center lg:gap-12
      `">
        <ToggleInput
          :class="`lg:toggle-md toggle-md lg:order-2`"
          :state-color="true"
          :triple="true"
          @change="emit('modeChange')"
          v-model="modeModel"
        />
        <AddBtn :class="`lg:btn-md btn-sm mx-auto `" :color="'white'" @click="() => (formModalIsShowModel = true)" />
      </div>
      <RepoLink :class="`lg:h-16 lg:w-16 w-10 h-10`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import RepoLink from '@/components/ui/RepoLink.vue'
import ToggleInput from '@/components/ui/ToggleInput.vue'
import AddBtn from '@/components/ui/AddBtn.vue'

const emit = defineEmits(['modeChange'])

const modeModel = defineModel<boolean | null>('mode')
const formModalIsShowModel = defineModel<boolean>('formModalIsShow')
</script>

<style scoped></style>
