<template>
  <template v-if="props.maxLength || props.label || props.title">
    <label data-id="InputData" :class="`min-w-0`" >
      <div v-if="props.title" class="pb-2 pl-1 font-medium">{{ props.title }}</div>
      <div :class="mainClasses + `flex items-center gap-2`">
        <span v-if="props.label">{{ props.label }}</span>
        <input v-bind="props" class="grow min-w-0" v-model="valueModel" />
        <span v-if="props.maxLength" class="badge badge-neutral">{{
          valueModel.length + '/' + props.maxLength
        }}</span>
      </div>
    </label>
  </template>

  <template v-else>
    <input data-id="InputData" :class="mainClasses" v-bind="props" v-model="valueModel" />
  </template>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  label?: string
  type: 'text' | 'number' | 'tel' | 'email' | 'password' | 'search'
  maxLength?: number | string
  required?: boolean
  placeholder?: string
}>()
const valueModel = defineModel<string>({
  required: true,
})

const mainClasses = `bg-transparent input input-bordered `
</script>
