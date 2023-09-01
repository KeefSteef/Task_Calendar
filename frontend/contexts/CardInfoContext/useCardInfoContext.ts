import { useContext } from 'react'
import { ApiCardInfoContext, StateCardInfoContext } from './index'

export const useStateCardInfoContext = () => {
  return useContext(StateCardInfoContext)
}

export const useApiCardInfoContext = () => {
  return useContext(ApiCardInfoContext)
}
