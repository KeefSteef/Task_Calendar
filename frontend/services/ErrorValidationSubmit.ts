import { IErrorField } from '../components/Register/types'
import { v4 as uuidv4 } from 'uuid'
import { IToast } from '../types/toast'

export type ErrorType = Record<string, IErrorField>

export type toastFunction = (toastData: IToast) => void

export const errorValidationSubmit = (errors: ErrorType, toast: toastFunction) => {
  Object.entries(errors).map((error) => {
    toast({
      type: 'error',
      id: uuidv4(),
      message: error[1].message,
    })
  })
}
