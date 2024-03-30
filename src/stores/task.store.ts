import { defineStore } from 'pinia'
import type { IMacroTask, ITask } from '@/interfaces/task.interface'
import isMacroTask from '@/guards/isMacroTask.guard'
import { ref, watch, type Ref } from 'vue'

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

    createTask(id: number, title: string, desc?: string): ITask {
      return {
        id,
        title,
        desc,
        createdAt: Date.now(),
        isDone: false,
      }
    },

    addTask(title: string, desc?: string, nestedTasks?: ITask[]): ITask | IMacroTask {
      if (nestedTasks && nestedTasks.length > 0) {
        const task: IMacroTask = ref({
          ...this.createTask(state.__initId.value++, title, desc),
          nestedData: {
            tasks: nestedTasks,
            doneCount: 0,
          },
        }).value

        watch(task, ({ ...oldValue }) => this.updateMacroTask(oldValue.id))

        state.tasks.value.push(task)

        return task
      }

      const task: ITask = this.createTask(state.__initId.value++, title, desc)

      state.tasks.value.push(task)

      return task
    },

    deleteTaskByID(id: number) {
      state.tasks.value = state.tasks.value.filter((task) => task.id === id)
    },

    updateMacroTask(id: number) {
      const macroTask = this.getTaskById(id)

      if (macroTask && isMacroTask(macroTask)) {
        const { tasks } = macroTask.nestedData

        const updatedDoneCount = tasks.reduce((acc, task) => {
          if (task.isDone) {
            return acc + 1
          } else {
            return acc
          }
        }, 0)

        if (updatedDoneCount === tasks.length) {
          macroTask.isDone = true
        } else {
          macroTask.isDone = false
        }

        macroTask.nestedData.doneCount = updatedDoneCount
      }
    },
  }

  demo.map((task) => {
    if (isMacroTask(task)) {
      actions.addTask(task.title, task.desc, task.nestedData.tasks)
    } else {
      actions.addTask(task.title, task.desc)
    }
  })

  return { ...state, ...actions }
})

const demo: (ITask | IMacroTask)[] = [
  {
    id: 1,
    title: 'Неготовая таска',
    desc: 'Есть много вариантов Lorem Ipsum, но большинство из них и слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он использует словарь из более чем 200 латинских слов, а также набор моделей предложений. В результате сгенерированный Lorem Ipsum выглядит правдоподобно, не имеет повторяющихся абзацей или "невозможных" слов.',
    createdAt: Date.now(),
    isDone: false,
  },

  {
    id: 2,
    title: 'Очень длинная готовая таска',
    desc: 'Есть много вариантов Lorem Ipsum, но большинство из них и слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он использует словарь из более чем 200 латинских слов, а также набор моделей предложений. В результате сгенерированный Lorem Ipsum выглядит правдоподобно, не имеет повторяющихся абзацей или "невозможных" слов.',
    createdAt: Date.now(),
    isDone: false,
  },

  {
    id: 3,
    title: 'Макро таска',
    desc: 'Есть много вариантов Lorem Ipsum, но большинство из них и слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он использует словарь из более чем 200 латинских слов, а также набор моделей предложений. В результате сгенерированный Lorem Ipsum выглядит правдоподобно, не имеет повторяющихся абзацей или "невозможных" слов.',
    createdAt: Date.now(),
    isDone: false,
    nestedData: {
      doneCount: 1,
      tasks: [
        {
          id: 1,
          title: 'Неготовая таска',
          desc: 'Есть много вариантов Lorem Ipsum, но большинство из них и слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он использует словарь из более чем 200 латинских слов, а также набор моделей предложений. В результате сгенерированный Lorem Ipsum выглядит правдоподобно, не имеет повторяющихся абзацей или "невозможных" слов.',
          createdAt: Date.now(),
          isDone: false,
        },
        {
          id: 2,
          title: 'Неготовая таска',
          desc: 'Есть много вариантов Lorem Ipsum, но большинство из них и слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он использует словарь из более чем 200 латинских слов, а также набор моделей предложений. В результате сгенерированный Lorem Ipsum выглядит правдоподобно, не имеет повторяющихся абзацей или "невозможных" слов.',
          createdAt: Date.now(),
          isDone: false,
        },
        {
          id: 3,
          title: 'Неготовая таска',
          desc: 'Есть много вариантов Lorem Ipsum, но большинство из них и слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он использует словарь из более чем 200 латинских слов, а также набор моделей предложений. В результате сгенерированный Lorem Ipsum выглядит правдоподобно, не имеет повторяющихся абзацей или "невозможных" слов.',
          createdAt: Date.now(),
          isDone: false,
        },
        {
          id: 4,
          title: 'Очень длинная готовая таска',
          desc: 'Есть много вариантов Lorem Ipsum, но большинство из них и слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он использует словарь из более чем 200 латинских слов, а также набор моделей предложений. В результате сгенерированный Lorem Ipsum выглядит правдоподобно, не имеет повторяющихся абзацей или "невозможных" слов.',
          createdAt: Date.now(),
          isDone: false,
        },
      ],
    },
  },
]

export { useTaskStore }
