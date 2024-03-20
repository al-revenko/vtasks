import type { ITask } from "./task.interface";

export interface IMacroTask extends ITask{
  tasks: ITask[]
  doneCount: number
}