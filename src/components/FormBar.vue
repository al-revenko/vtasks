<template>
  <MenuBarLayout>
    <BackBtn
      :class="`lg:my-auto lg:btn-md btn-sm`"
      :color="'white'"
      @click="callbacks.onClick"
    />
  </MenuBarLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import MenuBarLayout from '@/components/layouts/MenuBarLayout.vue'
import BackBtn from '@/components/ui/BackBtn.vue'

const router = useRouter()

const callbacks = {
  onClick() {
    router.push({ name: 'home' })
  },
}
</script>
