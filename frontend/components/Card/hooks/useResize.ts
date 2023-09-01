import { getRect, parentSurface } from '../../../utils'
import { useRef } from 'react'
import { ICardParams } from '../../../types/card'

export function useResize(setCardParams: Function, fetchUpdateParams: Function) {
  const paramNode = useRef<HTMLElement | null>(null)

  function resizeMouseDownListener(cardContainer: HTMLElement): void {
    const table = parentSurface(cardContainer, 'grid')
    table.addEventListener('mousemove', mouseMoveHandler)
    table.addEventListener('mouseup', mouseUpHandler)

    paramNode.current = cardContainer
  }

  function mouseMoveHandler(event: MouseEvent) {
    const cardContainer = paramNode.current as HTMLElement
    const { offsetHeight } = cardContainer
    const { y } = getRect(cardContainer)
    if (event.pageY < y + scrollY + offsetHeight - 20 && offsetHeight > 80) {
      setCardParams((prev: ICardParams) => ({ ...prev, cardSize: prev.cardSize - 20 }))
    }

    if (event.pageY > y + window.scrollY + offsetHeight) {
      setCardParams((prev: ICardParams) => ({ ...prev, cardSize: prev.cardSize + 20 }))
    }
  }

  function mouseUpHandler() {
    const element = paramNode.current as HTMLElement
    const table = parentSurface(element, 'grid')
    fetchUpdateParams()
    table.removeEventListener('mousemove', mouseMoveHandler)
    table.removeEventListener('mouseup', mouseUpHandler)
  }

  return {
    resizeMouseDownListener,
  }
}
