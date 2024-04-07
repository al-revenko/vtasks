import { ref, watch, reactive, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { IMacroTask, ITask } from '@/types/task.interface'
import isMacroTask from '@/guards/isMacroTask.guard'

interface ITaskStore {
  __initId: Ref<number>
  tasks: Ref<(ITask | IMacroTask)[]>
}

const useTaskStore = defineStore('tasks', () => {
  const state: ITaskStore = {
    __initId: ref(1),
    tasks: ref([]),
  }

  const actions = {
    getTaskById(id: number): ITask | IMacroTask | undefined {
      return state.tasks.value.find((task) => task.id === id)
    },

    getTasksByStatus(status: boolean, tasksArray: (ITask | IMacroTask)[]): (ITask | IMacroTask)[] {
      return tasksArray.filter((task) => task.isDone === status)
    },

    createTask(id: number, title: string, desc?: string): ITask {
      return {
        id,
        title,
        desc,
        createdAt: Date.now(),
        isDone: false,
      }
    },

    addTask(title: string, desc?: string, microTasks?: string[]): ITask | IMacroTask {
      if (microTasks && microTasks.length > 0) {
        let microID: number = 1
        const task = reactive<IMacroTask>({
          ...this.createTask(state.__initId.value++, title, desc),
          nestedData: {
            tasks: microTasks.map((title) => this.createTask(microID++, title)),
            doneCount: 0,
          },
        })

        watch(task.nestedData.tasks, () => this.updateDoneCount(task))

        state.tasks.value.push(task)

        return task
      }

      const task: ITask = this.createTask(state.__initId.value++, title, desc)

      state.tasks.value.push(task)

      return task
    },

    deleteTaskByID(id: number) {
      state.tasks.value = state.tasks.value.filter((task) => task.id !== id)
    },

    updateDoneCount(macroTask: IMacroTask) {
      const { tasks } = macroTask.nestedData

      const doneCount = tasks.reduce((acc, task) => {
        if (task.isDone) {
          return acc + 1
        }

        return acc
      }, 0)

      macroTask.nestedData.doneCount = doneCount

      if (doneCount === tasks.length) {
        macroTask.isDone = true
        return macroTask
      }

      if (doneCount < tasks.length) {
        macroTask.isDone = false
        return macroTask
      }
    },

    forceTaskStatus(id: number, status: boolean): ITask | IMacroTask | null {
      const task = this.getTaskById(id)

      if (!task) {
        return null
      }

      if (!isMacroTask(task)) {
        task.isDone = status
        return task
      }

      if (status === true) {
        task.nestedData.tasks.forEach((task) => (task.isDone = true))
        task.nestedData.doneCount = task.nestedData.tasks.length
        return task
      }

      task.nestedData.tasks.forEach((task) => (task.isDone = false))
      task.nestedData.doneCount = 0
      return task
    },
  }

  demo.map((task) => {
    actions.addTask(task.title, task.desc, task.microTasks)
  })

  return { ...state, ...actions }
})

const demoData: { title: string; desc?: string; microTasks?: string[] }[] = [
  {
    title: 'Неготовая таска',
    desc: 'Есть много вариантов Lorem Ipsum, но большинство из них и слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он использует словарь из более чем 200 латинских слов, а также набор моделей предложений. В результате сгенерированный Lorem Ipsum выглядит правдоподобно, не имеет повторяющихся абзацей или "невозможных" слов.',
  },

  {
    title: 'Очень длинная готовая таска',
    desc: 'Есть много вариантов Lorem Ipsum, но большинство из них и слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он использует словарь из более чем 200 латинских слов, а также набор моделей предложений. В результате сгенерированный Lorem Ipsum выглядит правдоподобно, не имеет повторяющихся абзацей или "невозможных" слов.',
  },

  {
    title: 'Макро таска',
    desc: 'Есть много вариантов Lorem Ipsum, но большинство из них и слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он использует словарь из более чем 200 латинских слов, а также набор моделей предложений. В результате сгенерированный Lorem Ipsum выглядит правдоподобно, не имеет повторяющихся абзацей или "невозможных" слов.',
    microTasks: [
      'Микро таска',
      'Микро таска',
      'Микро таска',
      'Микро таска',
      'Микро таска',
      'Микро таска',
      'Микро таска',
      'Микро таска',
      'Микро таска',
      'Микро таска',
      'Микро таска',
      'Микро таска',
      'Микро таска',
      'Микро таска',
      'Микро таска',
      'Микро таска',
    ],
  },
  {
    title: 'Таска без описания',
  },
]

const demo = [...demoData]

export { useTaskStore }
