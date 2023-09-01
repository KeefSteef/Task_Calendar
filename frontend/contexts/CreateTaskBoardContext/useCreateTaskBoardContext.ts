import { useContext } from 'react'
import { ApiTaskBoardContext, StateTaskBoardContext } from './index'

export const useStateTaskBoardContext = () => {
  return useContext(StateTaskBoardContext)
}

export const useApiTaskBoardContext = () => {
  return useContext(ApiTaskBoardContext)
}
