<template>
    <input
      data-id="CheckboxInput"
      v-model="checkedModel"
      @change=" emit('change', ($event.target as HTMLInputElement).checked)"
      :type="'checkbox'"
      :class="'checkbox border-slate-400 checked:border-lime-500 [--chkfg:white] [--chkbg:theme(colors.lime.500)] checkbox-'+props.size"
    />
</template>

<script setup lang="ts">
import { defineModel } from 'vue'

type SizeType = 'xs' | 'sm'| 'md'| 'lg'

const props = defineProps<{
  size: SizeType  
}>()

const checkedModel = defineModel<boolean>()

const emit = defineEmits(['change'])

</script>
