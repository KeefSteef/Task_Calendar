import { AnimatePresence, motion } from 'framer-motion'
import cls from './CompletedItem.module.scss'
import Image from 'next/image'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useReturnTask } from './hooks/useReturnTask'
import { ITaskWithOwner } from '../../types/task'

interface ICompletedItem {
  task: ITaskWithOwner
  setTasks: Dispatch<SetStateAction<ITaskWithOwner[]>>
}

const CompletedItem: FC<ICompletedItem> = ({ task, setTasks }) => {
  const { doBack } = useReturnTask()
  const [isExist, setExist] = useState(true)
  return (
    <motion.div layout>
      <AnimatePresence
        onExitComplete={() =>
          setTasks((prev: ITaskWithOwner[]) => prev.filter((prevTask) => prevTask.id !== task.id))
        }
      >
        {isExist && (
          <motion.div
            exit={{ x: -200, opacity: 0 }}
            transition={{ x: { duration: 0.4 } }}
            onDragEnd={(event, info) => {
              if (info.offset.x < -300) {
                setExist(false)
                doBack(task)
              }
            }}
            drag="x"
            dragConstraints={{ right: 0, left: 0 }}
            dragElastic={0.1}
          >
            <motion.div
              className={cls.stick}
              initial={{ width: '0px' }}
              animate={{ width: '100%' }}
              transition={{ ease: 'easeOut', duration: 0.4, delay: 2.6 }}
            />
            <motion.li
              className={cls.task}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 0.4, delay: 2 }}
            >
              <Image src={'/complete.svg'} width={20} height={20} alt={'complete'} />
              <p>{task.name}</p>
            </motion.li>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default CompletedItem
