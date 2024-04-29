import { computed, toValue, type MaybeRef } from 'vue'
import type { INestedData } from '@/types/task.interface'

function usePercentage(nestedData: MaybeRef<INestedData | null>) {
  return computed(() => {
    const value = toValue(nestedData)

    if (value === null) {
      return 0
    }

    const tasksCount = value.tasks.length
    const doneCount = value.doneCount

    if (doneCount > 0) {
      return Math.floor((doneCount / tasksCount) * 100)
    }

    return 0
  })
}

export default usePercentage
