<template>
  <MenuBarLayout>
    <BackPageBtn
      :class="`lg:order-2 lg:mb-auto lg:mt-12 lg:btn-md btn-sm`"
      :color="'white'"
      @click="callbacks.onClick"
    />
    <CheckboxInput :class="`lg:w-12 lg:h-12 w-8 h-8 bg-white rounded-none border-none`" v-model="statusModel" @change="emit('statusChange', statusModel)" />
    <DeleteBtn
      :class="`lg:order-3 lg:btn-md btn-sm`"
      :color="'white'"
      @click="emit('delete', $event)"
    />
  </MenuBarLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import MenuBarLayout from '@/components/layouts/MenuBarLayout.vue'
import BackPageBtn from '@/components/ui/BackPageBtn.vue'
import CheckboxInput from './ui/CheckboxInput.vue'
import DeleteBtn from './ui/DeleteBtn.vue'

const statusModel = defineModel<boolean>('status', { required: true })

const emit = defineEmits(['delete', 'statusChange'])

const router = useRouter()

const callbacks = {
  onClick() {
    router.push({ name: 'home' })
  },
}
</script>
