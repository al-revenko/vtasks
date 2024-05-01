<template>
  <div
    v-if="!isEdit"
    :class="`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2`"
  >
    <slot />
    <EditBtn :class="`sm:btn-xs btn-sm`" @click="() => (isEdit = true)" />
  </div>
  <form
    v-else
    :class="`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2`"
    @submit.prevent="callbacks.onTitleSubmit"
  >
    <InputData 
      type="text"  
      :placeholder="props.placeholder"
      :required="props.required"
      :max-length="props.maxLength"
      v-model="newTitle"
    />
    <DoneBtn :class="`btn-sm`" type="submit" />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputData from '@/components/ui/InputData.vue';
import EditBtn from '@/components/ui/EditBtn.vue'
import DoneBtn from '@/components/ui/DoneBtn.vue'

const props = defineProps<{
  maxLength?: number
  required?: boolean
  placeholder?: string
}>()
const titleModel = defineModel<string>({ required: true })

const isEdit = ref<boolean>(false)
const newTitle = ref<string>(titleModel.value)

const callbacks = {
  onTitleSubmit() {
    titleModel.value = newTitle.value
    isEdit.value = false
  },
}
</script>
