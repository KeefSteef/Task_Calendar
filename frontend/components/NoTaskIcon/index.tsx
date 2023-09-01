import cls from './NoTask.module.scss'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'

const NoTaskIcon: FC<{ show: boolean }> = ({ show }) => {
  return (
    <AnimatePresence>
      {!show && (
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cls.noTasks_container}
        >
          <Image priority src={'/no-tasks.svg'} width={100} height={120} alt={'no-task'} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NoTaskIcon
