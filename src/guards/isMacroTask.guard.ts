import type { IMacroTask, ITask } from '@/types/task.interface'

function isMacroTask(task: ITask): task is IMacroTask {
  if ('nestedData' in task) {
    return true
  }

  return false
}

export default isMacroTask
