import cls from './DateInput.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import DatePicker from '../DatePicker'
import { parseDateToBoardFormat } from '../../../utils'
import { useStateTaskBoardContext } from '../../../contexts/CreateTaskBoardContext/useCreateTaskBoardContext'

interface ITaskBoard {
  top: number
  left: number
}

const DateInput = ({ weekDaysList }: { weekDaysList: string[] }) => {
  const [showCalendar, setShow] = useState(false)
  const { left } = useStateTaskBoardContext() as ITaskBoard
  const prevLeft = useRef(left)
  const columnNum = Math.round(left / 160) - 1
  const columnDate = weekDaysList[columnNum] || weekDaysList[0]
  const [value, setValue] = useState(columnDate) // 11.10.2023

  if (prevLeft.current !== left) {
    setValue(columnDate)
    prevLeft.current = left
  }

  return (
    <div>
      <input type="hidden" name={'date'} value={value} />
      <div onClick={() => setShow(true)} className={`${cls.dateInput} dateCalendar`}>
        {parseDateToBoardFormat(value)}
      </div>
      {showCalendar && <DatePicker date={value} showCalendar={setShow} setValue={setValue} />}
    </div>
  )
}

export default DateInput
