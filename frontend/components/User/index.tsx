import cls from './User.module.scss'
import Image from 'next/image'
import { useExit } from './hooks/useExit'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useOutsideClick } from '../../hooks/useOutsideClick'

const User = () => {
  const { doExit } = useExit()
  const [showBoard, setShow] = useState(false)
  const ref = useOutsideClick(() => setShow(false))
  return (
    <div className={`${cls.user} outBoard`} onClick={(event) => event.stopPropagation()}>
      <div className={cls.userIcon} onClick={() => setShow((prev) => !prev)}>
        <Image src={'/person.svg'} width={'20px'} height={'20px'} alt={'person'} />
      </div>
      <AnimatePresence>
        {showBoard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={cls.user_board}
          >
            <ul>
              <a href={'/authorization'}>
                <li className={`${cls.out} outBoard`} ref={ref} onClick={doExit}>
                  <Image src={'/exit.svg'} width={25} height={25} alt={'exit'} />
                  <p>Out</p>
                </li>
              </a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default User
