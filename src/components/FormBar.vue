<template>
  <MenuBarLayout>
    <BackPageBtn
      :class="`lg:my-auto lg:btn-lg btn-sm`"
      :color="'white'"
      @click="callbacks.onClick"
    />
  </MenuBarLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import MenuBarLayout from '@/components/layouts/MenuBarLayout.vue'
import BackPageBtn from '@/components/ui/BackPageBtn.vue'

const router = useRouter()

const callbacks = {
  onClick() {
    router.push({ name: 'home' })
  },
}
</script>
