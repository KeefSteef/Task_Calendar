import React, { Dispatch, SetStateAction, useRef } from 'react'
import { ICardParams } from '../../../types/card'

export const useDrag = (
  cardTop: number,
  setCardParams: Dispatch<SetStateAction<{ cardTop: number; cardSize: number }>>,
  fetchUpdateParams: Function
) => {
  let cardHeight: number = 0
  let cursorCord: number = 0
  let step = cardTop

  const paramNode = useRef<Element | null>(null)

  function cardMouseDownListener(
    event: React.MouseEvent<Element, MouseEvent>,
    card: HTMLDivElement
  ): void {
    cursorCord = event.nativeEvent.offsetY
    cardHeight = card.offsetHeight

    paramNode.current = card.offsetParent
    document.addEventListener('mousemove', cardMouseMoveListener)
    document.addEventListener('mouseup', removeCardMoveListeners)
  }

  function removeCardMoveListeners(): void {
    fetchUpdateParams()
    document.removeEventListener('mousemove', cardMouseMoveListener)
    document.removeEventListener('mouseup', removeCardMoveListeners)
    paramNode.current = null
  }

  function cardMouseMoveListener(event: MouseEvent): void {
    cardToCol(event.target as HTMLElement, paramNode.current as HTMLElement)

    if (event.pageY - 290 > step + cursorCord + 20 && step < 1920 - cardHeight) {
      setCardParams((prev: ICardParams) => ({ ...prev, cardTop: prev.cardTop + 20 }))
      step += 20
    }

    if (event.pageY - 290 < step + cursorCord - 20 && step > 0) {
      setCardParams((prev: ICardParams) => ({ ...prev, cardTop: prev.cardTop - 20 }))
      step -= 20
    }
  }

  return {
    cardMouseDownListener,
  }
}

const cardToCol = (target: HTMLElement, cardContainer: HTMLElement) => {
  const column = target.parentElement?.parentElement!

  if (target.className.includes('column')) {
    target.appendChild(cardContainer)
  }

  if (target.className.includes('card') && !column.className.includes('grid_container')) {
    column.appendChild(cardContainer)
  }
}
