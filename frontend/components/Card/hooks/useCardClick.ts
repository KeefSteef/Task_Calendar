import { useApiCardInfoContext } from '../../../contexts/CardInfoContext/useCardInfoContext'
import { parentSurface, parsePxToTime } from '../../../utils'
import { MouseEvent } from 'react'

interface IUseCardClickData {
  name: string
  cardTop: number
  cardSize: number
  id: string
  mod: string
}

export const useCardClick = (params: IUseCardClickData) => {
  const api = useApiCardInfoContext()
  const { name, cardTop, cardSize, id, mod } = params
  const clickHandler = (event: MouseEvent, cardContainer: HTMLDivElement) => {
    const target = event.target as HTMLElement
    const columnDay: string = parentSurface(target, 'column').dataset.column_day!
    const columnID: string = parentSurface(target, 'column').dataset.column_id!

    const apiData = { name, cardTop, cardSize, id, mod }

    if (target.id !== 'card') {
      return false
    }

    if (+columnID > 4) {
      const cardOffsetWithWidth = target.getBoundingClientRect().x - 500 - 10

      return api({
        columnDay,
        timeStart: parsePxToTime(cardTop),
        x: mod === 'day' ? target.getBoundingClientRect().x : cardOffsetWithWidth,
        y: cardContainer.offsetTop,
        ...apiData,
      })
    }

    const cardOffsetWithWidth = target.getBoundingClientRect().x + target.offsetWidth - event.clientX + 10
    return api({
      columnDay,
      timeStart: parsePxToTime(cardTop),
      x: mod === 'day' ? target.getBoundingClientRect().x : event.clientX + cardOffsetWithWidth,
      y: cardContainer.offsetTop,
      ...apiData,
    })
  }

  return {
    clickHandler,
  }
}
