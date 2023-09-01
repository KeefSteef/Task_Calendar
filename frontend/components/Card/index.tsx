import cls from './Card.module.scss'
import React, { FC, useRef, useState } from 'react'
import { useDrag } from './hooks/useDrag'
import { useResize } from './hooks/useResize'
import CardTimeRange from '../CardTimeRange'
import { useCardUpdate } from './hooks/useCardUpdate'
import { useCardClick } from './hooks/useCardClick'
import { ICard, ICardParams } from '../../types/card'

const Card: FC<ICard> = ({ data, top, height, columnDay, mod }) => {
  const cardContainer = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const resizeRef = useRef<HTMLDivElement>(null)
  const [cardParams, setCardParams] = useState<ICardParams>({
    cardTop: top,
    cardSize: height - top,
  })

  const { fetchUpdateParams } = useCardUpdate(cardParams, columnDay, data.id)
  const { clickHandler } = useCardClick({ ...data, ...cardParams, mod })
  const { resizeMouseDownListener } = useResize(setCardParams, () =>
    fetchUpdateParams(cardRef.current!, cardParams)
  )

  const { cardMouseDownListener } = useDrag(cardParams.cardTop, setCardParams, () =>
    fetchUpdateParams(cardRef.current!, cardParams)
  )

  return (
    <div
      className={cls.card_container}
      onClick={(event) => clickHandler(event, cardContainer.current as HTMLDivElement)}
      onDragStart={() => false}
      ref={cardContainer}
      style={{ top: cardParams.cardTop }}
      draggable={false}
    >
      <div
        className={cls.card}
        onMouseDown={(event) => cardMouseDownListener(event, cardRef.current as HTMLDivElement)}
        style={{ height: cardParams.cardSize + 'px', width: mod === 'day' ? '99%' : '150px' }}
        id={'card'}
        onDragStart={() => false}
        ref={cardRef}
        draggable={false}
      >
        <p>{data.name}</p>
        <CardTimeRange top={Math.max(0, cardParams.cardTop)} size={cardParams.cardSize} />
      </div>
      <div
        onDragStart={() => false}
        className={cls.resize}
        onMouseDown={() => resizeMouseDownListener(cardContainer.current as HTMLElement)}
        ref={resizeRef}
      ></div>
    </div>
  )
}

export default Card
