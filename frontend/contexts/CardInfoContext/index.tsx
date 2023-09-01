import React, { createContext, FC, ReactNode, useCallback, useState } from 'react'
import { ICardInfo } from '../../types/pages/Calendar'

export const StateCardInfoContext = createContext<ICardInfo | {}>({})
export const ApiCardInfoContext = createContext<Function>(() => {})

interface ICardInfoContextProvider {
  children: ReactNode
}

export const CardInfoContextProvider: FC<ICardInfoContextProvider> = ({ children }) => {
  const [card, setCard] = useState<ICardInfo | {}>({})
  const api = useCallback(
    (object: object) => {
      setCard(object)
    },
    [setCard]
  )
  return (
    <StateCardInfoContext.Provider value={card}>
      <ApiCardInfoContext.Provider value={api}>{children}</ApiCardInfoContext.Provider>
    </StateCardInfoContext.Provider>
  )
}

export default CardInfoContextProvider
