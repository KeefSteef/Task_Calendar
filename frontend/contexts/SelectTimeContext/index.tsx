import { createContext, ReactNode, useCallback, useState } from 'react'

export const StateSelectTimeContext = createContext('')
export const ApiSelectTimeContext = createContext((time: string) => {})

export const SelectTimeContextProvider = ({ children }: { children: ReactNode }) => {
  const [startTime, setStartTime] = useState('12:00AM')

  const api = useCallback(
    (time: string) => {
      setStartTime(time)
    },
    [setStartTime]
  )

  return (
    <StateSelectTimeContext.Provider value={startTime}>
      <ApiSelectTimeContext.Provider value={api}>{children}</ApiSelectTimeContext.Provider>
    </StateSelectTimeContext.Provider>
  )
}
