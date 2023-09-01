import React, { ChangeEventHandler, FC } from 'react'
import cls from './FormInput.module.scss'

interface IFormInput {
  placeholder: string
  labelText: string
  onChangeHandler: ChangeEventHandler
  isHidden?: boolean
  value?: string
  isValidMsg?: string
}

const FormInput: FC<IFormInput> = ({ placeholder, labelText, onChangeHandler, isValidMsg = '', isHidden = false }) => {
  return (
    <div className={`${cls.inputContainer} ${isValidMsg && cls.error}`}>
      <label htmlFor={placeholder}>{labelText}</label>
      <input
        id={placeholder}
        onChange={onChangeHandler}
        placeholder={placeholder}
        className={cls.formInput}
        type={isHidden ? 'password' : 'text'}
        autoComplete={isHidden ? 'on' : 'off'}
      />
    </div>
  )
}

export default FormInput
