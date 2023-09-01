import { useContext } from 'react'
import { ApiSelectTimeContext, StateSelectTimeContext } from './index'

export const useSelectTimeContextState = () => {
  return useContext(StateSelectTimeContext)
}

export const useSelectTimeContextApi = () => {
  return useContext(ApiSelectTimeContext)
}
