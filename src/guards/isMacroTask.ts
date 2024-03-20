import type { IMacroTask } from '../interfaces/macroTask.interface'

export function isMacroTask(task: object): task is IMacroTask {
  const hasTasks = 'tasks' in task && Array.isArray(task.tasks)
  const hasDoneCount = 'doneCount' in task && Number.isInteger(task.doneCount)

  if (hasTasks && hasDoneCount) {
    return true
  }

  return false
}
