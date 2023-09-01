import { useMutation } from '@apollo/client'
import { UPDATE_TASK_MUTATION } from '../../../graphql/Mutations'
import { useRef } from 'react'
import { isObjectsCompare, parentSurface, parsePxToTime } from '../../../utils'
import { useToast } from '../../../hooks/useToast'
import { v4 } from 'uuid'

interface IUseCardUpdate {
  cardTop: number
  cardSize: number
}

export const useCardUpdate = (params: IUseCardUpdate, columnDay: string, id: string) => {
  const [editTask] = useMutation(UPDATE_TASK_MUTATION)
  const prevParams = useRef<IUseCardUpdate>(params)
  const prevColumnDay = useRef<string>(columnDay)
  prevParams.current = params

  const { toast } = useToast()

  const fetchUpdateParams = (card: HTMLElement, params: IUseCardUpdate) => {
    const columnDay = parentSurface(card, 'column').dataset.column_day
    if (isObjectsCompare(prevParams.current, params) && columnDay === prevColumnDay.current) {
      return
    }

    prevColumnDay.current = columnDay as string

    editTask({
      variables: {
        id,
        taskInput: {
          timeStart: parsePxToTime(prevParams.current.cardTop),
          timeEnd: parsePxToTime(prevParams.current.cardTop + card.offsetHeight),
          date: prevColumnDay.current,
        },
      },
    }).then(() => {
      toast({
        type: 'success',
        id: v4(),
        message: 'Event saved',
      })
    })
  }

  return {
    fetchUpdateParams,
  }
}
