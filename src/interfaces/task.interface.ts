export interface ITask {
  id: number
  title: string
  desc?: string
  isDone: boolean
  createdAt: number
}

export interface IMacroTask extends ITask {
  nestedData: {
    tasks: ITask[]
    doneCount: number
  }
}
