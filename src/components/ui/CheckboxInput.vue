<template>
  <input
    :tabindex="tabindex"
    data-id="CheckboxInput"
    v-model="checkedModel"
    @change="emit('change', ($event.target as HTMLInputElement).checked)"
    @click="emit('click', $event)"
    :type="'checkbox'"
    :class="
      'checkbox border-slate-400 checked:border-lime-500 [--chkfg:white] [--chkbg:theme(colors.lime.500)] checkbox-' +
      props.size
    "
  />
</template>

<script setup lang="ts">
import { defineModel } from 'vue'
import type { SizeType } from '@/types/size.type'

const props = defineProps<{
  size: SizeType
  tabindex?: number
}>()

const checkedModel = defineModel<boolean>()

const emit = defineEmits(['change', 'click'])
</script>
