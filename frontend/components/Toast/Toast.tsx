import React, { FC, useState } from 'react'
import cls from './Toasts.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { toastMotion } from './motion'
import Image from 'next/image'
import { useRemoveToast } from './hooks/useRemoveToast'

interface IToast {
  id: string
  type: string
  message: string
}

const Toast: FC<IToast> = ({ type, message, id }) => {
  const [isShow, setShow] = useState(true)
  if (type !== 'success' && type !== 'error') {
    throw new Error(`Toast have not ${type} type`)
  }

  const { removeToastHandler } = useRemoveToast(id, setShow)

  return (
    <AnimatePresence onExitComplete={() => removeToastHandler(id)}>
      {isShow && (
        <motion.div
          className={cls.toast}
          transition={{ duration: 0.15, delay: type === 'success' ? 0.15 : 0 }}
          variants={toastMotion}
          initial={'initial'}
          animate={'enter'}
          exit={'exit'}
        >
          <div className={cls.icon}>
            <Image src={'/warning.svg'} width={15} height={15} alt={'warning'} />
          </div>
          <div className={cls.toast_text}>
            <p>{message}</p>
          </div>
          <div className={cls.cross} onClick={() => setShow(false)}>
            <Image src={'/cross.svg'} width={10} height={10} alt={'cross'} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
