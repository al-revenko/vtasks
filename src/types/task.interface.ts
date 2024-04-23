export interface INestedData {
  tasks: ITask[]
  doneCount: number
}

export interface ITask<T extends 'macro' | 'micro' | unknown = unknown> {
  id: number
  title: string
  desc?: string
  isDone: boolean
  createdAt: number
  nestedData: T extends 'macro' ? INestedData : T extends 'micro' ? null : INestedData | null
}
