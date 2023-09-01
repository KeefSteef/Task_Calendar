import React, { FC } from 'react'
import cls from './Clock.module.scss'
import { motion } from 'framer-motion'

interface IClock {
  cardHeight: number
}

const Clock: FC<IClock> = ({ cardHeight }) => {
  let hourValue = Math.floor(cardHeight / 80)
  let minutesValue = +((0.0075 * cardHeight) % 0.5999).toFixed(2).slice(2)

  return (
    <div className={cls.clock}>
      <motion.div animate={{ rotate: `${hourValue * 30}deg` }} className={cls.hour_hand}></motion.div>
      <motion.div animate={{ rotate: `${minutesValue * 6}deg` }} className={cls.minute_hand}></motion.div>
      <div className={cls.center}></div>
    </div>
  )
}

export default Clock
