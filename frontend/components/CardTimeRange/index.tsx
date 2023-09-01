import cls from './CardTimeRange.module.scss'
import { FC, useEffect } from 'react'
import { useChangeTime } from './hooks/useChangeTime'
import Clock from '../Clock'
import { skipSimmilarFormat } from '../../utils'

interface ICardTimeRange {
  top: number
  size: number
}

const CardTimeRange: FC<ICardTimeRange> = (props) => {
  const { startTime, endTime } = useChangeTime(props)
  return (
    <div className={cls.card_time}>
      <Clock cardHeight={props.size + props.top} />
      <p>{skipSimmilarFormat(startTime, endTime)}</p>
    </div>
  )
}

export default CardTimeRange
