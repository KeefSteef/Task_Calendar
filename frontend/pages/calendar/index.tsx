import cls from './Calendar.module.scss'
import { NextPage } from 'next'
import CalendarMain from '../../components/CalendarMain'

const Calendar: NextPage = () => {
  return (
    <div className={cls.calendar}>
      <CalendarMain />
    </div>
  )
}

export default Calendar
