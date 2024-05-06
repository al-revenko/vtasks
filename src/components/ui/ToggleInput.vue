<template>
  <input
    data-id="ToggleInput"
    v-if="triple"
    ref="toggle"
    type="checkbox"
    :class="classes"
    @click="callbacks.onTripleClick($event.target as HTMLInputElement)"
    @change="emit('change', state)"
  />
  <input
    data-id="ToggleInput"
    v-else
    type="checkbox"
    :class="classes"
    v-model="state"
    @change="emit('change', state)"
  />
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
          setChecked(false)
        } else {
          state.value = true
          setChecked(true)
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

const setChecked = (value: boolean) => {
  if (toggle.value) {
    toggle.value.checked = value
  }
}

const setIndeterminate = (value: boolean) => {
  if (toggle.value) {
    toggle.value.indeterminate = value
  }
}

onMounted(() => {
  if (state.value === null) {
    setIndeterminate(true)
    setChecked(true)
  } else {
    setChecked(state.value)
  }
})

const classes = props.stateColor
  ? 'toggle [&:not(:indeterminate)]:[&:not(:checked)]:bg-rose-600 [&:not(:indeterminate)]:checked:bg-lime-600 border-white'
  : 'toggle border-white'

const emit = defineEmits(['change'])
</script>
