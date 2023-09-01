import React, { FC } from 'react'
import cls from './Column.module.scss'
import Card from '../Card'
import { getTopAndHeightFromTime } from '../../utils'
import { ITask } from '../../types/task'

interface IColumn {
  tasks: ITask[]
  day: string
  columnId: number
  mod: string
}

const Column: FC<IColumn> = ({ tasks, day, columnId, mod }) => {
  return (
    <div
      className={`${cls.grid_column} column`}
      style={{ width: mod === 'day' ? '75vw' : '160px' }}
      id={'column'}
      data-column_id={columnId}
      data-column_day={day}
    >
      {tasks?.map((task: ITask) => {
        const { top, height } = getTopAndHeightFromTime(task.timeStart, task.timeEnd)
        return <Card mod={mod} key={task.id} data={task} columnDay={task.date} top={top} height={height} />
      })}
    </div>
  )
}

export default Column
