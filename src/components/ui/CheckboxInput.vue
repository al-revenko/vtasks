<template>
  <div>
    <input
      v-model="checkedModel"
      :type="'checkbox'"
      :class="'checkbox border-slate-400 checked:border-lime-500 [--chkfg:white] [--chkbg:theme(colors.lime.500)] ' + size"
    />
  </div>
</template>

<script setup lang="ts">
import { defineModel } from 'vue'

type SizeType = 'xs' | 'sm'| 'md'| 'lg'

const props = defineProps<{
  size: SizeType  
}>()

const checkedModel = defineModel<boolean>()

const size = 'checkbox-' + props.size
</script>
