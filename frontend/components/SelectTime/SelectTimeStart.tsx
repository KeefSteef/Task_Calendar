import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import cls from './SelectTime.module.scss'
import Select from '../Ui/Select'
import { v4 } from 'uuid'

interface ISelectTimeStart {
  name: string
  startTime: string
  optionsList: string[]
  setStartTime: Dispatch<SetStateAction<string>>
  indexOfTimesInOptionList: number
}

const SelectTimeStart: FC<ISelectTimeStart> = ({
  name,
  startTime,
  setStartTime,
  optionsList,
  indexOfTimesInOptionList,
}) => {
  const [showSelect, setShow] = useState(false)

  return (
    <div className={`${cls.select_container}`} onClick={() => setShow(true)}>
      <input type="hidden" name={name} value={startTime} />
      <div className={`${cls.select_target} select_start`}>{startTime}</div>
      <div>
        {showSelect && (
          <Select
            exceptionClass={'select_start'}
            initialTime={indexOfTimesInOptionList}
            setShow={setShow}
            onChangeHandler={setStartTime}
          >
            {optionsList.map((el: string) => {
              return (
                <option key={v4()} value={el}>
                  {el}
                </option>
              )
            })}
          </Select>
        )}
      </div>
    </div>
  )
}

export default SelectTimeStart
