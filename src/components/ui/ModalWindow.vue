<template>
  <div
    data-id="ModalWindow"
    :class="'flex items-center justify-center h-screen w-screen fixed left-0 top-0 backdrop-blur-sm'"
    v-show="isShowModel ? true : ''"
  >
    <div :class="'min-h-80 min-w-80 bg-white border rounded-md drop-shadow-lg relative p-4'">
      <div :class="'flex justify-between gap-2 items-center'">
        <slot name="head" />
        <CloseBtn :class="'btn-sm'" @click="() => callbacks.onClose()" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import CloseBtn from '@/components/ui/CloseBtn.vue'
import useDisableScroll from '@/composables/useDisableScroll'

const props = defineProps<{
  title?: string
}>()

const isShowModel = defineModel<boolean>({ required: true })

useDisableScroll(isShowModel)

const callbacks = {
  onClose() {
    isShowModel.value = false
  },
}
</script>
