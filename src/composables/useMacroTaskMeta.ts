import { computed, type Ref } from 'vue'
import usePercentage from '@/composables/usePercentage'

function useMacroTaskMeta(data: Ref<{ doneCount: number; tasks: unknown[] } | undefined>): {
  hasTasks: Ref<boolean>
  donePercentage: Ref<number>
} {

  const hasTasks = computed(() => {
    if (data.value && data.value.tasks.length > 0) {
      return true
    }

    return false
  })

  const donePercentage = computed(() => {
    if (data.value) {
      return usePercentage(data.value.tasks.length, data.value.doneCount).value
    }

    return 0
  }) 

  return { hasTasks, donePercentage}
}

export default useMacroTaskMeta
