<template>
  <label v-if="props.title || props.maxLength" data-id="InputArea" class="form-control">
    <div class="label pt-0">
      <span v-if="props.title" class="mr-auto font-medium">{{ props.title }}</span>
      <span v-if="props.maxLength" class="label-text-alt ml-auto">{{
        valueModel.length + '/' + props.maxLength
      }}</span>
    </div>
    <textarea :class="textAreaClasses" v-bind="props" v-model="valueModel"></textarea>
  </label>
  <textarea v-else :class="textAreaClasses" v-bind="props" v-model="valueModel"></textarea>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  maxLength?: number | string
  required?: boolean
  placeholder?: string
  resize?: boolean
}>()
const valueModel = defineModel<string>({
  required: true,
})

const resizeClass = !props.resize ? '  resize-none' : ''
const textAreaClasses = `grow w-full textarea textarea-bordered bg-transparent` + resizeClass
</script>
