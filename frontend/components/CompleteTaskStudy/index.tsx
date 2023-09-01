import cls from './CompleteTaskStudy.module.scss'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { v4 as uuid4 } from 'uuid'

const CompleteTaskStudy = () => {
  const [state, setState] = useState(uuid4())
  const [isExist, setExist] = useState(false)

  return (
    <motion.div
      animate={{ x: 0 }}
      transition={{ delay: 5 }}
      onAnimationComplete={() => setExist(true)}
    >
      <AnimatePresence>
        {isExist && (
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 150 }}
            className={cls.card_container}
          >
            <motion.div
              className={cls.card}
              key={state}
              animate={{ x: 0 }}
              transition={{ delay: 5 }}
              onAnimationComplete={() => setState(uuid4())}
            >
              <div className={cls.card_nav}>
                <div className={cls.cross}>
                  <Image
                    src={'/cross.svg'}
                    width={12}
                    height={12}
                    onClick={() => setExist(false)}
                    alt={'cross'}
                  />
                </div>
              </div>
              <div className={cls.title}>
                <p>Back task to calendar</p>
              </div>
              <div className={cls.task_container}>
                <motion.div
                  animate={{ x: -150, opacity: 0 }}
                  transition={{ delay: 3.1, duration: 1 }}
                  className={cls.task}
                >
                  <Image src={'/complete.svg'} width={20} height={20} alt={'complete'} />
                  <p>Example of task title</p>
                </motion.div>
                <motion.div
                  className={cls.hands}
                  initial={{ x: 0, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                  animate={{ x: -150, y: -35 }}
                >
                  <motion.div
                    transition={{ duration: 1, delay: 3 }}
                    animate={{ x: -50 }}
                    className={cls.closed}
                  >
                    <Image src={'/closedhand.svg'} width={45} height={45} alt={'closehand'} />
                  </motion.div>
                  <motion.div
                    className={cls.open}
                    animate={{ opacity: [1, 0] }}
                    transition={{ delay: 2.5 }}
                  >
                    <Image src={'/openhand.svg'} width={45} height={45} alt={'openhand'} />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default CompleteTaskStudy
