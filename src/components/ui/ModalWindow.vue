<template>
  <div
    data-id="ModalWindow"
    :class="`
      h-dvh w-dvw
      flex items-center justify-center 
      fixed left-0 top-0 z-50
      backdrop-blur-sm
    `"
    v-show="isShowModel ? true : ''"
  >
    <div
      :class="`
        w-full h-full max-h-screen
        md:min-h-52 md:min-w-72 md:h-auto md:w-auto 
        p-4
        relative 
        bg-white border md:rounded-md drop-shadow-lg 
      `"
    >
      <div :class="'flex justify-between gap-2 items-center'">
        <div :class="'flex w-full'">
          <slot name="head" />
        </div>
        <div>
          <CloseBtn @click="callbacks.onClose" :class="'btn-sm'" />
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import CloseBtn from '@/components/ui/CloseBtn.vue'
import useDisableScroll from '@/composables/useDisableScroll'

const isShowModel = defineModel<boolean>('isShow', { required: true })

useDisableScroll(isShowModel)

const callbacks = {
  onClose() {
    isShowModel.value = false
  },
}
</script>
