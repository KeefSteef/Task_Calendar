import cls from './CardInfoBoard.module.scss'
import Image from 'next/image'
import {
  useApiCardInfoContext,
  useStateCardInfoContext,
} from '../../contexts/CardInfoContext/useCardInfoContext'
import { useCardInfoBoard } from './hooks/useCardnfoBoard'
import { parsePxToTime } from '../../utils'
import React, { FC, RefObject, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ICardInfo } from '../../types/pages/Calendar'

const CardInfoBoard: FC<{ days: string[] }> = ({ days }) => {
  const state = useStateCardInfoContext() as ICardInfo
  const api = useApiCardInfoContext()
  const prevDays = useRef(days)
  const { enableBoard, disableBoard, removeCard, doCompleteCard } = useCardInfoBoard(state, api)
  const infoBoard = useRef<HTMLElement>(null)

  const isShow = prevDays.current[0] === days[0]
  prevDays.current = days

  return (
    <div>
      <AnimatePresence mode={'wait'}>
        {state.name && isShow && (
          <motion.div
            ref={infoBoard as RefObject<HTMLDivElement>}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.1 }}
            className={cls.cardInfo_container}
            id={'cardInfoContainer'}
            style={{ ...enableBoard() }}
          >
            <div className={cls.cardInfoNav}>
              <Image
                width={'25px'}
                onClick={() => doCompleteCard(state.id)}
                height={'25px'}
                src={'/done3.svg'}
                alt={'done'}
              />
              <Image
                onClick={removeCard}
                width={'30px'}
                height={'30px'}
                src={'/trash.svg'}
                alt={'trash'}
              />
              <svg
                onClick={() => disableBoard()}
                width="22"
                height="22"
                viewBox="0 0 37 38"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="3.76276"
                  width="5"
                  height="45.7742"
                  rx="1"
                  transform="rotate(-42.8743 0 3.76276)"
                  fill="#000"
                />
                <rect
                  x="32.6185"
                  width="5"
                  height="47"
                  rx="1"
                  transform="rotate(43.9485 32.6185 0)"
                  fill="#000"
                />
              </svg>
            </div>
            <div className={cls.info_container}>
              <div className={cls.title}>
                <h3>{state.name}</h3>
              </div>
              <div className={cls.card_info}>
                <div className={cls.icon_container}>
                  <Image width={'30px'} height={'30px'} src={'/clock.svg'} alt={'clock'} />
                  <p>
                    {parsePxToTime(state.cardTop)}-{parsePxToTime(state.cardTop + state.cardSize)}
                  </p>
                </div>
                <div className={cls.icon_container}>
                  <Image
                    width={'30px'}
                    height={'30px'}
                    src={'/calendar_day.svg'}
                    alt={'calendar'}
                  />
                  <p>{state.columnDay}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CardInfoBoard
