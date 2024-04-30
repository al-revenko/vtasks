<template>
  <div :class="`flex gap-2 items-center`">
    <slot>{{ 'Текст' }}</slot>
    <EditBtn v-if="!isEdit" :class="`btn-xs`" @click="() => (isEdit = true)" />
    <DoneBtn v-else form="descForm" :class="`btn-xs`" type="submit" />
  </div>
  <TextP v-if="!isEdit && textModel" :class="`pl-4 pt-6 text-lg`">
    {{ textModel }}
  </TextP>
  <form v-else-if="isEdit" id="descForm" :class="``" @submit.prevent="callbacks.onTextSubmit">
    <label class="form-control w-[95%] mx-auto">
      <div v-if="props.maxLength ?? false" class="label">
        <span class="label-text"></span>
        <span class="label-text-alt">{{ newText.length + ' / ' + props.maxLength }}</span>
      </div>
      <div v-else :class="`pt-6`"></div>
      <textarea
        :class="`
          min-h-40
          textarea textarea-bordered 
          bg-transparent 
        `"
        placeholder="Описание задачи"
        :maxlength="props.maxLength"
        v-model="newText"
      ></textarea>
    </label>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EditBtn from '@/components/ui/EditBtn.vue'
import TextP from '@/components/ui/TextP.vue'
import DoneBtn from '@/components/ui/DoneBtn.vue'

const props = defineProps<{
  maxLength?: number
  placeholder?: string
}>()

const textModel = defineModel<string>({ required: true })

const newText = ref<string>(textModel.value)
const isEdit = ref<boolean>(false)

const callbacks = {
  onTextSubmit() {
    textModel.value = newText.value
    isEdit.value = false
  },
}
</script>
