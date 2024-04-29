export interface INestedData {
  tasks: ITask[]
  doneCount: number
}

export interface ITask {
  id: number
  title: string
  desc: string
  isDone: boolean
  createdAt: number
  nested: INestedData | null
}