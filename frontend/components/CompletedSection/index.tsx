import cls from './CompletedSection.module.scss'
import moment from 'moment'
import { FC, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CompletedItem from '../CompletedItem'
import { ITask, ITaskWithOwner } from '../../types/task'

interface ICompletedSection {
  date: string
  index: number
  show: boolean
  tasks: ITaskWithOwner[]
  setState: Function
}

interface IFilterStateData {
  date: string
  disable: boolean
  show: boolean
  tasks: ITask[]
}

const CompletedSection: FC<ICompletedSection> = ({ date, tasks, index, show, setState }) => {
  const [day, month, year] = date.split('.')
  const readyMonth = useRef(
    moment()
      .month(+month - 1)
      .format('MMM')
  )

  const [stateTasks, setTasks] = useState(tasks)
  const [isExist, setExist] = useState(show)
  const section = useRef<HTMLUListElement>(null)

  if (isExist !== show) {
    setExist(show)
  }

  return (
    <motion.div layout>
      <AnimatePresence
        onExitComplete={() => {
          setExist(false)
          if (!stateTasks.length) {
            setState((prev: IFilterStateData[]) => {
              const newArr = [...prev]
              const index = prev.findIndex((item: IFilterStateData) => item.date === date)
              newArr[index].disable = true
              newArr[index].show = false
              return [...newArr]
            })
          }
        }}
      >
        {isExist && show && stateTasks.length && (
          <motion.div exit={{ opacity: 0, y: -20, height: '100%' }} className={cls.completedSection}>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: 'easeOut', duration: 0.4, delay: index / 2 }}
              className={cls.completedDate}
            >
              <div
                className={cls.day}
                style={{
                  background: `url('/calendar_day.svg')`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              >
                <p>{day}</p>
              </div>
              <div className={cls.monthAndYear}>
                {readyMonth.current} {year}
              </div>
            </motion.div>
            <motion.ul
              className={cls.tasks}
              style={{ height: section.current ? section.current.offsetHeight : '100%' }}
              ref={section}
              transition={{ ease: 'easeOut', duration: 0.4, delay: index / 2 + 0.2 }}
              initial={{ opacity: 0, y: 150 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {stateTasks.map((task) => (
                <CompletedItem key={task.id} setTasks={setTasks} task={task} />
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default CompletedSection
