<template>
  <template v-if="props.maxLength">
    <label data-id="InputData" class="bg-transparent w-full input input-bordered flex items-center gap-2">
      <input v-bind="props" class="grow" v-model="valueModel" />
      <span class="badge badge-neutral">{{ valueModel.length + '/' + props.maxLength }}</span>
    </label>
  </template>

  <template v-else>
    <input
      data-id="InputData"
      class="bg-transparent w-full input input-bordered"
      v-bind="props"
      v-model="valueModel"
    />
  </template>
</template>

<script setup lang="ts">
const props = defineProps<{
  type: 'text' | 'number' | 'tel' | 'email' | 'password' | 'search'
  maxLength?: number | string
  required?: boolean
  placeholder?: string
}>()
const valueModel = defineModel<string>({
  required: true,
})
</script>
