import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import Image from 'next/image'
import cls from './DatePicker.module.scss'
import { useMonth } from './hooks/useMonth'
import { useOutsideClick } from '../../../hooks/useOutsideClick'

interface IDatePicker {
  date: string
  showCalendar: Dispatch<SetStateAction<boolean>>
  setValue: Dispatch<SetStateAction<string>>
}

const DatePicker: FC<IDatePicker> = ({ showCalendar, setValue, date }) => {
  const [_, month, year] = date.split('.')
  const selectedDateMonth =
    +month - new Date().getMonth() - 1 + (+year - new Date().getFullYear()) * 12
  const [monthIndex, setMonthIndex] = useState(selectedDateMonth)
  const { daysMonth, monthAndYearFormat, currentMonthIndex } = useMonth(monthIndex)
  const ref = useOutsideClick(() => showCalendar(false), 'dateCalendar')

  return (
    <div className={cls.calendar} ref={ref} onClick={(event) => event.stopPropagation()}>
      <div className={cls.calendar_nav}>
        <div className={cls.calendar_title}>
          <h3>{monthAndYearFormat}</h3>
        </div>
        <div className={cls.calendar_switches}>
          <div onClick={() => setMonthIndex((prev) => prev - 1)}>
            <Image width={15} height={15} src={'/arrow.svg'} alt={'arrow'} />
          </div>
          <div onClick={() => setMonthIndex((prev) => prev + 1)}>
            <Image width={15} height={15} src={'/arrow.svg'} alt={'arrow'} />
          </div>
        </div>
      </div>
      <div className={cls.calendar_days}>
        <span>Su</span>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>St</span>
      </div>
      <div className={cls.calendar_month_days}>
        {daysMonth?.map((el) => {
          const [dayNum, monthNum, _] = el.split('.')
          return (
            <div
              key={el}
              onClick={() => {
                showCalendar(false)
                setValue(el)
              }}
              style={{ opacity: monthNum !== currentMonthIndex ? 0.3 : 1 }}
            >
              {dayNum}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DatePicker
