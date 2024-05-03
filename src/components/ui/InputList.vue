<template>
  <form data-id="InputList" class="flex flex-col gap-2" @submit.prevent="callbacks.onItemAdd">
    <label class="form-control w-full">
      <div class="label pt-0">
        <span v-if="props.title" class="mr-auto font-medium">{{ props.title }}</span>
        <span v-if="props.itemsMaxcount" class="ml-auto label-text"
          >{{ listModel.length }}/{{ props.itemsMaxcount }}</span
        >
      </div>
      <div v-if="listModel.length < (props.itemsMaxcount ?? Infinity)" :class="`flex gap-2`">
        <InputData
          ref="inputRef"
          class="w-full"
          type="text"
          :max-length="props.inputMaxlength"
          :placeholder="props.inputPlaceholder"
          required
          v-model="itemTitle"
        />
        <AddBtn type="submit" :class="'btn-md'" />
      </div>
    </label>
    <template v-if="listModel.length > 0">
      <ul
        :class="`
            mt-2 px-2 py-2
            grid grid-cols-1 grid-flow-row gap-2
            border-2 border-gray-300 rounded-md
            overflow-y-auto
          `"
      >
        <li
          :class="`
              pr-2
              flex justify-between items-center
            `"
          v-for="(task, i) in listModel"
          :key="i"
        >
          <span :class="`pr-1 max-w-[90%] text-sm break-words`">{{ task }}</span>
          <CloseBtn type="button" :class="'btn-sm lg:btn-xs'" @click="() => callbacks.onItemDelete(i)" />
        </li>
      </ul>
    </template>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputData from '@/components/ui/InputData.vue'
import CloseBtn from '@/components/ui/CloseBtn.vue'
import AddBtn from '@/components/ui/AddBtn.vue'

const props = defineProps<{
  title?: string
  itemsMaxcount?: number
  inputMaxlength?: number | string
  inputPlaceholder?: string
}>()

const listModel = defineModel<string[]>({
  required: true,
})

const itemTitle = ref<string>('')

const inputRef = ref<HTMLElement | null>(null)

const callbacks = {
  onItemAdd() {
    if (itemTitle.value.length > 0) {
      if (props.itemsMaxcount && listModel.value.length < props.itemsMaxcount) {
        listModel.value.push(itemTitle.value)
        itemTitle.value = ''
      } else if (!props.itemsMaxcount) {
        listModel.value.push(itemTitle.value)
        itemTitle.value = ''
      }
      
      if (inputRef.value) {
        inputRef.value.focus()
      }
    }
  },

  onItemDelete(index: number) {
    listModel.value.splice(index, 1)
  },
}
</script>
