import cls from './Grid.module.scss'
import Column from '../Column'
import React, { FC, useRef } from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_TASK } from '../../graphql/Queris'
import CreateTaskBoard from '../CreateTaskBoard'
import { useCreateTaskBoard } from './hooks/useCreateTaskBoard'
import { motion } from 'framer-motion'
import { v4 } from 'uuid'
import { ITask } from '../../types/task'

let user: string

if (typeof window !== 'undefined') {
  user = localStorage.getItem('user') as string
}

interface IGrid {
  weekDaysList: string[]
  mod: string
}

const Grid: FC<IGrid> = ({ weekDaysList, mod }) => {
  const { data = [] } = useQuery(QUERY_TASK, {
    variables: { dates: weekDaysList, owner: user },
  })

  const grid = useRef<HTMLElement>(null)
  const createTaskBoard = useRef<HTMLElement>(null)
  const { mouseDownHandler } = useCreateTaskBoard()

  if (createTaskBoard.current) {
    createTaskBoard.current.style.display = 'none'
  }

  return (
    <motion.div
      className={cls.grid_container}
      ref={grid as React.RefObject<HTMLDivElement>}
      id={'grid'}
      onMouseDown={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        mouseDownHandler(event, grid.current as HTMLElement, createTaskBoard.current as HTMLElement)
      }
    >
      <div className={cls.create_task} ref={createTaskBoard as React.RefObject<HTMLDivElement>}>
        <CreateTaskBoard
          weekDaysList={weekDaysList}
          disableHandler={() => {
            if (createTaskBoard.current) createTaskBoard.current.style.display = 'none'
          }}
        />
      </div>
      {weekDaysList.map((day: string, index) => {
        const columnTasks = data.tasks?.filter((task: ITask) => task.date === day)
        return (
          <Column mod={mod} key={v4()} columnId={index + 1} tasks={columnTasks || []} day={day} />
        )
      })}
    </motion.div>
  )
}

export default Grid
