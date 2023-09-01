import { ITask } from './task'

export interface ICard {
  data: ITask
  columnDay: string
  top: number
  height: number
  mod: string
}

export interface ICardParams {
  cardTop: number
  cardSize: number
}
