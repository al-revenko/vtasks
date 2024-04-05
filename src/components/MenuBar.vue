<template>
  <div
    data-id="MenuBar"
    :class="'w-10/12 lg:h-[90dvh] justify-self-center sticky top-[5%] box-border bg-zinc-700 rounded-md'"
  >
    <div :class="'h-full flex flex-col items-center justify-between pb-5 pt-7 px-2'">
      <div :class="'flex flex-col items-center gap-12'">
        <AddBtn :color="'white'" @click="() => (formModalIsShowModel = true)" />
        <ToggleInput
          :state-color="true"
          :triple="true"
          @change="emit('modeChange')"
          v-model="modeModel"
        />
      </div>
      <RepoLink />
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
