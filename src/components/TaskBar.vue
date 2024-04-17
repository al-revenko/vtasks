<template>
  <MenuBarLayout>
    <BackPageBtn :class="`lg:btn-md btn-sm`" :color="'white'" @click="callbacks.onClick" />
    <div
      v-if="props.percentage != undefined"
      :class="`
        flex flex-col sm:flex-row lg:flex-col items-center gap-1 sm:gap-2
        lg:order-[-1]
        w-[20%] h-full lg:w-2 lg:h-[25%]
      `"
    >
      <span :class="`w-16 text-center text-white lg:text-lg font-semibold`">{{ props.percentage + '%' }}</span>
      <ProgressBar :class="`lg:rotate-180 lg:w-2 lg:h-full w-full h-2`" :percentage="props.percentage" :is-vertical="isVerticalBar" />
    </div>
    <CheckboxInput
      :class="`lg:order-[-2] lg:w-12 lg:h-12 w-8 h-8 bg-white rounded-none border-none`"
      v-model="statusModel"
      @change="emit('statusChange', statusModel)"
    />
    <div v-if="props.percentage != undefined" :class="`w-[20%] h-full lg:w-2 lg:h-[25%] invisible`"></div>
    <DeleteBtn :class="`lg:btn-md btn-sm`" :color="'white'" @click="emit('delete', $event)" />
  </MenuBarLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useBreakpoints from '@/composables/useBreakpoints'
import MenuBarLayout from '@/components/layouts/MenuBarLayout.vue'
import BackPageBtn from '@/components/ui/BackPageBtn.vue'
import CheckboxInput from '@/components/ui/CheckboxInput.vue'
import DeleteBtn from '@/components/ui/DeleteBtn.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'

const props = defineProps<{
  percentage?: number
}>()

const statusModel = defineModel<boolean>('status', { required: true })
const isVerticalBar = ref<boolean>(false)

const emit = defineEmits(['delete', 'statusChange'])

const router = useRouter()

const callbacks = {
  onClick() {
    router.push({ name: 'home' })
  },

  onBreakpoint(match: boolean) {
    isVerticalBar.value = match
  }
}

useBreakpoints(1024, callbacks.onBreakpoint)

</script>
