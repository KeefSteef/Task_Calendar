import React, { FC, useRef, useState } from 'react'
import cls from './SelectTime.module.scss'
import Select from '../Ui/Select'
import { v4 } from 'uuid'

interface ISelectTimeEnd {
  startTime: string
  name: string
  optionsList: string[]
  indexOfTimesInOptionList: number
}

const SelectTimeEnd: FC<ISelectTimeEnd> = ({ startTime, name, optionsList, indexOfTimesInOptionList }) => {
  const [showSelect, setShow] = useState(false)
  const [value, setValue] = useState(startTime)

  const prevStartTime = useRef(startTime)
  const startFromOptionIndex = indexOfTimesInOptionList + 4
  const startTimeIndexWithAddedHour = optionsList.slice(startFromOptionIndex).indexOf(value)

  if (prevStartTime.current !== startTime) {
    setValue(optionsList[startFromOptionIndex])
    prevStartTime.current = startTime
  }

  return (
    <div className={`${cls.select_container}`} onClick={() => setShow(true)}>
      <input type="hidden" name={name} value={value} />
      <div className={`${cls.select_target} select_end`}>{value}</div>
      {showSelect && (
        <Select
          setShow={setShow}
          initialTime={startTimeIndexWithAddedHour}
          onChangeHandler={setValue}
          exceptionClass={'select_end'}
        >
          {optionsList.slice(startFromOptionIndex).map((el) => {
            return (
              <option key={v4()} value={el}>
                {el}
              </option>
            )
          })}
        </Select>
      )}
    </div>
  )
}

export default SelectTimeEnd
