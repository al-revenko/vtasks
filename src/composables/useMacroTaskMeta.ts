import { computed, toValue, type ComputedRef, type Ref } from 'vue'
import usePercentage from '@/composables/usePercentage'

interface ITaskMeta {
  hasTasks: boolean
  donePercentage: number
}

interface IMacroData {
  doneCount: number
  tasks: object[]
}

function useMacroTaskMeta(macroData: Ref<IMacroData | undefined> | IMacroData | undefined): ComputedRef<ITaskMeta> {
  return computed(() => {

    const value =  toValue(macroData)

    const taskMeta: ITaskMeta = {
      hasTasks: false,
      donePercentage: 0,
    }

    if (value && value.tasks.length > 0) {
      const { tasks, doneCount } = value

      if (tasks.length > 0) {
        taskMeta.hasTasks = true
        taskMeta.donePercentage = usePercentage(tasks.length, doneCount).value
        return taskMeta
      }
    }

    return taskMeta
  })
}

export default useMacroTaskMeta
