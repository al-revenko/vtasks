<template>
  <div
    data-id="ModalWindow"
    :class="'flex items-center justify-center h-screen w-screen fixed left-0 top-0 backdrop-blur-sm'"
    v-show="isShowModel ? true : ''"
  >
    <div :class="'min-h-52 min-w-80 bg-white border rounded-md drop-shadow-lg relative p-4'">
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
