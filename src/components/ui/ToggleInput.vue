<template>
  <input
    v-if="triple"
    ref="toggle"
    type="checkbox"
    :class="classes"
    @click="callbacks.onTripleClick($event.target as HTMLInputElement)"
    @change="emit('change', state)"
  />
  <input v-else type="checkbox" :class="classes" v-model="state" @change="emit('change', state)" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  triple?: boolean
  stateColor?: boolean
}>()

const toggle = ref<HTMLInputElement | null>(null)
const state = defineModel<boolean | null>({ default: false })

const callbacks = {
  onTripleClick(target: HTMLInputElement) {
    switch (state.value) {
      case false:
        state.value = null
        setIndeterminate(true)
        break

      case null:
        if (target.checked) {
          state.value = false
        } else {
          state.value = true
        }
        setIndeterminate(false)
        break

      case true:
        state.value = null
        setIndeterminate(true)
        break
    }
  },
}

const setIndeterminate = (value: boolean) => {
  if (toggle.value) {
    toggle.value.indeterminate = value

    if (value === false && state.value !== null) {
      toggle.value.checked = state.value
    }
  }
}

onMounted(() => {
  if (state.value === null) {
    setIndeterminate(true)
  } else {
    setIndeterminate(false)
  }
})

const classes = props.stateColor
  ? 'toggle [&:not(:indeterminate)]:[&:not(:checked)]:bg-rose-600 [&:not(:indeterminate)]:checked:bg-lime-600 border-white'
  : 'toggle border-white'

const emit = defineEmits(['change'])
</script>
