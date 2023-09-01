export interface ITask {
  date: string
  id: string
  name: string
  timeEnd: string
  timeStart: string
}

export type ITaskWithOwner = ITask & { owner: string }
