import SelectTimeStart from './SelectTimeStart'
import SelectTimeEnd from './SelectTimeEnd'
import { useMemo, useRef, useState } from 'react'
import { useStateTaskBoardContext } from '../../contexts/CreateTaskBoardContext/useCreateTaskBoardContext'
import { generateTimeSelectOptions, parsePxToTime } from '../../utils'
import { ITaskBoard } from '../../types/taskBoard'

const SelectTime = () => {
  const { top } = useStateTaskBoardContext() as ITaskBoard
  const hour = parsePxToTime(Math.floor(top / 20) * 20)
  const prevTop = useRef(top)
  const [startTime, setStart] = useState(hour)
  const optionsList = useMemo(() => generateTimeSelectOptions(), [])
  const indexOfTimesInOptionList = optionsList.findIndex((time) => time === startTime)

  if (prevTop.current !== top) {
    setStart(hour)
    prevTop.current = top
  }

  return (
    <>
      <div className="select_time-start">
        <SelectTimeStart
          name={'timeStart'}
          setStartTime={setStart}
          startTime={startTime}
          indexOfTimesInOptionList={indexOfTimesInOptionList}
          optionsList={optionsList}
        />
      </div>
      <div className="select_time-end">
        <SelectTimeEnd
          indexOfTimesInOptionList={indexOfTimesInOptionList}
          optionsList={optionsList}
          startTime={startTime}
          name={'timeEnd'}
        />
      </div>
    </>
  )
}

export default SelectTime
