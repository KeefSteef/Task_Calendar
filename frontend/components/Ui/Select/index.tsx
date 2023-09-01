import React, { ChangeEvent, Dispatch, FC, ReactNode, RefObject, SetStateAction, useEffect } from 'react'
import cls from '../../SelectTime/SelectTime.module.scss'
import { useOutsideClick } from '../../../hooks/useOutsideClick'

interface ISelect {
  initialTime?: number
  children: ReactNode
  setShow: (show: boolean) => void
  onChangeHandler: Dispatch<SetStateAction<string>>
  exceptionClass: string
}

const Select: FC<ISelect> = ({ setShow, onChangeHandler, children, initialTime = 0, exceptionClass }) => {
  const selectChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setShow(false)
    onChangeHandler(event.target.value)
  }

  const selectRef = useOutsideClick(() => setShow(false), exceptionClass)

  useEffect(() => {
    if (initialTime && selectRef.current) {
      selectRef.current.scrollTo(0, initialTime * 40)
    }
  }, [setShow])

  return (
    <select
      onChange={selectChangeHandler}
      ref={selectRef as RefObject<HTMLSelectElement>}
      className={`${cls.select} calendar_select`}
      multiple
    >
      {children}
    </select>
  )
}

export default Select
