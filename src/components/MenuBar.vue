<template>
  <div
    data-id="MenuBar"
    :class="'w-10/12 lg:h-[90dvh] justify-self-center sticky top-[5%] box-border bg-zinc-700 rounded-md'"
  >
    <div :class="'h-full flex flex-col items-center justify-between pb-5 pt-7 px-2'">
      <div :class="'flex flex-col items-center gap-12'">
        <AddBtn :class="'w-10 h-10'" @click="emit('taskAdd', $event)" />
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
import AddBtn from '@/components/ui/AddBtn.vue'
import ToggleInput from '@/components/ui/ToggleInput.vue'

const emit = defineEmits(['taskAdd', 'modeChange'])

const modeModel = defineModel<boolean | null>('mode')
</script>

<style scoped></style>
