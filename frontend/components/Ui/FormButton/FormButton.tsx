import React, { FC } from 'react'
import cls from './FormButton.module.scss'

interface IFormButton {
  children: string
  onClick?: () => void
  isSubmit?: boolean
}

const FormButton: FC<IFormButton> = ({ children, onClick, isSubmit }) => {
  return (
    <button type={isSubmit ? 'submit' : 'button'} onClick={isSubmit ? onClick : () => {}} className={cls.btn}>
      {children}
    </button>
  )
}

export default FormButton
