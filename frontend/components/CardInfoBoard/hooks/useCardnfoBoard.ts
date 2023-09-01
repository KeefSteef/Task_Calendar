import { useMutation } from '@apollo/client'
import { DO_COMPLETE_TASK, REMOVE_TASK } from '../../../graphql/Mutations'
import { getRect } from '../../../utils'
import { ICardInfo } from '../../../types/pages/Calendar'

export const useCardInfoBoard = (state: ICardInfo, api: Function) => {
  const [removeHandler] = useMutation(REMOVE_TASK)
  const [doComplete] = useMutation(DO_COMPLETE_TASK)

  const enableBoard = () => {
    let top: number = state.y
    const { cardSize: size } = state
    const gridTable = <HTMLDivElement>document.getElementById('grid_table')!

    if (window.innerHeight + window.scrollY - (state.y + gridTable.offsetTop) < 250) {
      top -= 250
    } else if (window.scrollY > top && window.scrollY < size + top) {
      top = window.scrollY
    } else if (window.scrollY > top + size) {
      top += size + 10
    }

    return {
      top,
      left: state.x - getRect(gridTable).x + 'px',
    }
  }

  const removeCard = () => {
    removeHandler({
      variables: {
        id: state.id,
      },
      update(cache) {
        cache.modify({
          fields: {
            tasks: (existingData) => {
              existingData.filter((task: { id: string }) => task.id !== state.id)
            },
          },
        })
      },
    }).then(() => api({}))
  }

  const doCompleteCard = (id: string) => {
    doComplete({
      variables: {
        id,
      },
      update(cache) {
        cache.modify({
          fields: {
            tasks: (existingData) => {
              existingData.filter((task: { id: string }) => task.id !== state.id)
            },
          },
        })
      },
    }).then(() => api({}))
  }

  return {
    enableBoard,
    disableBoard: () => api({}),
    removeCard,
    doCompleteCard,
  }
}
