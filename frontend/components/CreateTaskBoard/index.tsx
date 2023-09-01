import React, { FC, FormEvent, useState } from 'react'
import cls from './CreateTaskBoard.module.scss'
import FormButton from '../Ui/FormButton/FormButton'
import DateInput from '../Ui/DateInput'
import { useCreateTask } from './hooks/useCreateTask'
import SelectTime from '../SelectTime'

interface ICreateTaskBoard {
  weekDaysList: string[]
  disableHandler: () => void
}

const CreateTaskBoard: FC<ICreateTaskBoard> = ({ disableHandler, weekDaysList }) => {
  const [showDatePicker, setShow] = useState(false)
  const { onSubmitTask } = useCreateTask(weekDaysList)

  return (
    <div>
      <div className={cls.taskBoard} id={'task_board'} onClick={() => (showDatePicker ? setShow(false) : false)}>
        <div className={cls.boardNav}>
          <div className={`${cls.cross} cross`} onClick={() => disableHandler()}>
            <svg width="15" height="15" viewBox="0 0 37 38" xmlns="http://www.w3.org/2000/svg">
              <rect
                y="3.76276"
                width="5"
                height="45.7742"
                rx="1"
                transform="rotate(-42.8743 0 3.76276)"
                fill="#5f6367"
              />
              <rect x="32.6185" width="5" height="47" rx="1" transform="rotate(43.9485 32.6185 0)" fill="#5f6367" />
            </svg>
          </div>
        </div>
        <div className={cls.boardFormContainer}>
          <form
            className={cls.boardForm}
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              onSubmitTask(event)
            }}
          >
            <div className={cls.formElement}>
              <div className={cls.formElementIcon}></div>
              <input type="text" name={'name'} placeholder={'Add title'} />
              <span className={cls.focusBorder}></span>
            </div>
            <div className={cls.formElement}>
              <div className={cls.formElementIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#606468" viewBox="0 0 32 32" width="25" height="25">
                  <path d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 C 6 10.464844 10.464844 6 16 6 Z M 15 8 L 15 17 L 22 17 L 22 15 L 17 15 L 17 8 Z" />
                </svg>
              </div>
              <div className={cls.setDates}>
                <DateInput weekDaysList={weekDaysList} />
              </div>
              <div className={cls.select_time}>
                <SelectTime />
              </div>
            </div>
            <div className={cls.formElement}>
              <div className={cls.submitBtn}>
                <FormButton isSubmit onClick={disableHandler}>
                  Send
                </FormButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateTaskBoard
