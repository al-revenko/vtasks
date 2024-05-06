<template>
  <div
    data-id="ModalLayout"
    :class="`
        p-4
        relative
        flex flex-col gap-2
        bg-white border rounded-md drop-shadow-lg 
      `"
  >
    <div :class="'flex justify-between gap-2 items-center'">
        <slot name="head" />
        <CloseBtn @click="callbacks.onClose" :class="'btn-sm'" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import CloseBtn from '@/components/ui/CloseBtn.vue'

const isShowModel = defineModel<boolean>('windowClose', {required: true})

const callbacks = {
  onClose() {
    isShowModel.value = false
  },
}
</script>
