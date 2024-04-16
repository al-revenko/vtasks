<template>
  <MenuBarLayout>
    <ToggleInput
      :class="`toggle-md lg:order-2 lg:mb-auto lg:mt-16`"
      :state-color="true"
      :triple="true"
      v-model="modeModel"
    />
    <AddBtn
      :class="`lg:btn-md btn-sm mx-auto`"
      :color="'white'"
      @click="() => (formIsShowModel = true)"
    />
    <RepoLink :class="`lg:h-16 lg:w-16 w-10 h-10 lg:order-3`" />
  </MenuBarLayout>
</template>

<script setup lang="ts">
import MenuBarLayout from '@/components/layouts/MenuBarLayout.vue'
import ToggleInput from '@/components/ui/ToggleInput.vue'
import AddBtn from '@/components/ui/AddBtn.vue'
import RepoLink from '@/components/ui/RepoLink.vue'

const modeModel = defineModel<boolean | null>('mode')
const formIsShowModel = defineModel<boolean>('formIsShow')
</script>
