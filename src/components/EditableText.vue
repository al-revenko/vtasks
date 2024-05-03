<template>
  <div data-id="EditableText" class="flex flex-col gap-2">
    <div :class="`flex gap-2 items-center`">
      <slot>{{ 'Текст' }}</slot>
      <EditBtn v-if="!isEdit" :class="`btn-xs`" @click="() => (isEdit = true)" />
      <DoneBtn v-else form="descForm" :class="`btn-xs`" type="submit" />
    </div>
    <TextP v-if="!isEdit && textModel" :class="`pl-4 pt-6 text-lg`">
      {{ textModel }}
    </TextP>
    <form v-else-if="isEdit" class="flex grow" id="descForm" @submit.prevent="callbacks.onTextSubmit">
      <InputArea v-if="props.maxLength" class="w-[95%] mx-auto" placeholder="Описание задачи" :max-length="props.maxLength"  v-model="newText" />
      <InputArea v-else class="pt-6 w-[95%] mx-auto" placeholder="Описание задачи" v-model="newText" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputArea from '@/components/ui/InputArea.vue'
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
