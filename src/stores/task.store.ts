import { ref, watch, reactive, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { ITask } from '@/types/task.interface'

interface ITaskStore {
  __initId: Ref<number>
  tasks: Ref<ITask[]>
}

const useTaskStore = defineStore('tasks', () => {
  const state: ITaskStore = {
    __initId: ref(1),
    tasks: ref([]),
  }

  const actions = {
    getTaskById(id: number): ITask | undefined {
      return state.tasks.value.find((task) => task.id === id)
    },

    getTasksByStatus(status: boolean, tasksArray: ITask[]): ITask[] {
      return tasksArray.filter((task) => task.isDone === status)
    },

    createTask(id: number, title: string, desc?: string): ITask {
      return {
        id,
        title,
        desc,
        createdAt: Date.now(),
        isDone: false,
        nestedData: null,
      }
    },

    findLastId(tasks: ITask[]): number {
      if (tasks.length === 0) {
        return 0
      }

      return tasks.reduce((lastId, task) => {
        if (task.id > lastId) {
          return task.id
        }

        return lastId
      }, 0)
    },

    addTask(
      title: string,
      optional?: {
        desc?: string
        microTasks?: string[]
      },
    ): ITask {
      const task = reactive<ITask>(this.createTask(state.__initId.value++, title, optional?.desc))

      if (optional?.microTasks && optional.microTasks.length > 0) {
        this.addMicroTasks(task, optional.microTasks)
      }

      state.tasks.value.push(task)

      return task
    },

    addMicroTasks(target: ITask, titles: string[]) {
      let initId: number = target.nestedData ? this.findLastId(target.nestedData.tasks) : 0

      const microTasks: ITask[] = titles.map((title) => this.createTask(initId++, title))

      if (target.nestedData) {
        target.nestedData.tasks.push(...microTasks)
        return target
      }

      target.nestedData = {
        doneCount: 0,
        tasks: microTasks,
      }

      watch(target.nestedData.tasks, () => this.updateNestedData(target))

      return target
    },

    deleteTaskByID(id: number) {
      state.tasks.value = state.tasks.value.filter((task) => task.id !== id)
    },

    updateNestedData(target: ITask) {
      if (target.nestedData === null) {
        return false
      }

      const { tasks } = target.nestedData

      if (tasks.length === 0) {
        target.nestedData = null
        return true
      }

      const doneCount = tasks.reduce((acc, task) => {
        if (task.isDone) {
          return acc + 1
        }
        return acc
      }, 0)

      target.nestedData.doneCount = doneCount

      if (doneCount === tasks.length) {
        target.isDone = true
      } else if (doneCount < tasks.length) {
        target.isDone = false
      }

      return true
    },

    forceTaskStatus(id: number, status: boolean): ITask | null {
      const task = this.getTaskById(id)

      if (!task) {
        return null
      }

      if (!task.nestedData) {
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
    actions.addTask(task.title, {
      desc: task.desc,
      microTasks: task.microTasks,
    })
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
      'Микро таска 1',
      'Микро таска 2',
      'Микро таска 3',
      'Микро таска 4',
      'Микро таска 5',
      'Микро таска 6',
      'Микро таска 7',
      'Микро таска 8',
      'Микро таска 9',
      'Микро таска 10',
      'Микро таска 11',
      'Микро таска 12',
      'Микро таска 13',
      'Микро таска 14',
      'Микро таска 15',
      'Микро таска 16',
    ],
  },
  {
    title: 'Таска без описания',
  },
  {
    title: 'Очень длинная готовая таска ну прям оочень',
    desc: 'Есть много вариантов Lorem Ipsum, но большинство из них и слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он использует словарь из более чем 200 латинских слов, а также набор моделей предложений. В результате сгенерированный Lorem Ipsum выглядит правдоподобно, не имеет повторяющихся абзацей или "невозможных" слов.',
    microTasks: [
      'Очень длинная готовая таска ну прям оочень',
      'Очень длинная готовая таска ну прям оочень',
      'Очень длинная готовая таска ну прям оочень',
      'Очень длинная таска',
      'Очень длинная готовая таска ну прям оочень',
      'Очень длинная готовая таска ну прям оочень',
      'Очень длинная готовая таска ну прям оочень',
      'Очень длинная готовая таска ну прям оочень',
      'Очень длинная готовая таска ну прям оочень',
      'Очень длинная готовая таска ну прям оочень',
      'Очень длинная таска',
      'Очень длинная готовая таска',
      'Очень длинная готовая таска ну прям оочень',
      'Очень длинная готовая таска ну прям оочень',
      'Очень длинная готовая таска ну прям оочень',
      'Очень длинная готовая таска',
    ],
  },
]

const demo = [...demoData, ...demoData, ...demoData, ...demoData, ...demoData]

export { useTaskStore }
