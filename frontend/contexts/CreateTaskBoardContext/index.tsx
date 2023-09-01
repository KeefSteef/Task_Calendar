import { createContext, FC, ReactNode, useCallback, useState } from 'react'
import { ITaskBoard } from '../../types/taskBoard'

interface ITaskBoardContextProvider {
  children: ReactNode
}

export const StateTaskBoardContext = createContext<ITaskBoard | {}>({})
export const ApiTaskBoardContext = createContext<Function>(() => {})

export const CreateTaskBoardContextProvider: FC<ITaskBoardContextProvider> = ({ children }) => {
  const [boardCoord, setBoardCoord] = useState({ top: 0, left: 0 })

  const api = useCallback(
    (options: { left: number; top: number }) => {
      setBoardCoord(options)
    },
    [setBoardCoord]
  )

  return (
    <StateTaskBoardContext.Provider value={boardCoord}>
      <ApiTaskBoardContext.Provider value={api}>{children}</ApiTaskBoardContext.Provider>
    </StateTaskBoardContext.Provider>
  )
}
