import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import Select from '../Ui/Select'
import cls from './SetCalendarMode.module.scss'

interface ISelectCalendarMode {
  setMode: Dispatch<SetStateAction<string>>
  setDayStartIndex: Dispatch<SetStateAction<number>>
  mode: string
}

const SelectCalendarMode: FC<ISelectCalendarMode> = ({ setMode, mode, setDayStartIndex }) => {
  const [isShow, setShow] = useState(false)
  return (
    <div className={cls.selected_mode_container}>
      <p onClick={() => setShow(true)} className={`${cls.selected_mode} select_text`}>
        {mode}
      </p>
      {isShow && (
        <Select
          exceptionClass={'select_text'}
          setShow={setShow}
          onChangeHandler={(value) => {
            setMode(value)
            setDayStartIndex(0)
          }}
        >
          <option value="week">Week</option>
          <option value="day">Day</option>
        </Select>
      )}
    </div>
  )
}

export default memo(SelectCalendarMode)
