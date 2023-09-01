import { FC } from 'react'
import cls from '../../pages/calendar/Calendar.module.scss'
import CalendarContainer from '../CalendarContainer'

const CalendarMain: FC = () => {
  return (
    <div className={cls.grid}>
      <CalendarContainer />
    </div>
  )
}

export default CalendarMain
