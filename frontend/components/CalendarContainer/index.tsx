import cls from '../../pages/calendar/Calendar.module.scss'
import { motion, useAnimationControls } from 'framer-motion'
import CardInfoContextProvider from '../../contexts/CardInfoContext'
import CardInfoBoard from '../CardInfoBoard'
import { CreateTaskBoardContextProvider } from '../../contexts/CreateTaskBoardContext'
import Grid from '../Grid'
import { FC, useRef, useState } from 'react'
import { useSwitchWeekOrDay } from '../../hooks/useSwitchWeek'
import { useMonthAndYearDate } from '../../hooks/useMonthAndYearDate'
import SelectCalendarMode from '../SetCalendarMode'

const CalendarContainer: FC = () => {
  const [dayStartIndex, setDayStartIndex] = useState(0)
  const [calendarMod, setMode] = useState<string>('week')
  const { weekDaysList, currentDay } = useSwitchWeekOrDay(dayStartIndex, calendarMod)
  const prevWeekDays = useRef<Array<string>>(weekDaysList)
  const { date } = useMonthAndYearDate(weekDaysList)
  const controls = useAnimationControls()

  if (weekDaysList !== prevWeekDays.current) {
    controls.start({ x: [50, 0], opacity: [0, 1] })
  }

  return (
    <div className={cls.grid_container}>
      <div className={cls.grid_nav_container}>
        <div className={cls.grid_nav}>
          <h1>
            {weekDaysList.length === 1 && weekDaysList[0].split('.')[0]} {date}
          </h1>
          <div className={cls.btns}>
            <button
              onClick={() => setDayStartIndex((prev) => prev - (calendarMod === 'week' ? 7 : 1))}
            >
              {'<'}
            </button>
            <button
              onClick={() => setDayStartIndex((prev) => prev + (calendarMod === 'week' ? 7 : 1))}
            >
              {'>'}
            </button>
            <button onClick={() => setDayStartIndex(0)}>Today</button>
          </div>
        </div>
        <div className={cls.select_calendar}>
          {
            <SelectCalendarMode
              mode={calendarMod}
              setDayStartIndex={setDayStartIndex}
              setMode={setMode}
            />
          }
        </div>
      </div>
      <motion.div transition={{ duration: 0.3 }} animate={controls} className={cls.dates_container}>
        {weekDaysList.length > 1 &&
          weekDaysList.map((date: string) => {
            const [currentDayNum]: string[] = date.split('.')
            return (
              <div key={date} className={cls.dates}>
                <div className={`${cls.dates_num} ${currentDay === date ? cls.active : ''}`}>
                  {currentDayNum}
                </div>
              </div>
            )
          })}
      </motion.div>
      <motion.div
        transition={{ duration: 0.3 }}
        animate={controls}
        className={cls.grid_table}
        id={'grid_table'}
      >
        <div className={cls.times}>
          <div />
          {new Array(23).fill(null).map((_, i) => {
            const index = i + 1
            if (index > 12) {
              return <div key={'time_part' + i}>{index - 12 + ' PM'}</div>
            }
            return <div key={'time_part' + i}>{index + (index === 12 ? ' PM' : ' AM')}</div>
          })}
        </div>
        <CardInfoContextProvider>
          <CardInfoBoard days={weekDaysList} />
          <CreateTaskBoardContextProvider>
            <Grid weekDaysList={weekDaysList} mod={calendarMod} />
          </CreateTaskBoardContextProvider>
        </CardInfoContextProvider>
      </motion.div>
    </div>
  )
}

export default CalendarContainer
