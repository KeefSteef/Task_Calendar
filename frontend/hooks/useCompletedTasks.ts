import { useQuery } from '@apollo/client'
import { QUERY_COMPLETED_TASKS } from '../graphql/Queris'
import { useState } from 'react'

let user: string | null
if (typeof window !== 'undefined') {
  user = localStorage.getItem('user')
}

type Test = 'id' | 'date' | 'name' | 'owner' | 'timeStart' | 'timeEnd'

type ITask = {
  [P in Test]: string
}

interface IFilterStateData {
  date: string
  disable: boolean
  show: boolean
  tasks: ITask[]
}

export const useCompletedTasks = () => {
  const [filterStateData, setFilterState] = useState<IFilterStateData[] | []>([])

  useQuery(QUERY_COMPLETED_TASKS, {
    variables: { owner: user },
    onCompleted: (data) => {
      const filteredFinalData = data.completedTasks.reduce(
        (acc: IFilterStateData[], item: ITask) => {
          const existingItem = acc.find((el: IFilterStateData) => {
            return el.date === item.date
          })
          if (existingItem) {
            existingItem.tasks.push(item)
          } else {
            acc.push({
              date: item.date,
              tasks: [item],
              show: true,
              disable: false,
            })
          }
          return acc
        },
        []
      )

      filteredFinalData.sort((a: IFilterStateData, b: IFilterStateData) => {
        const [aDay, aMonth, aYear] = a.date.split('.')
        const [bDay, bMonth, bYear] = b.date.split('.')

        if (aYear !== bYear) {
          return +bYear - +aYear
        }

        if (aMonth !== bMonth) {
          return +bMonth - +aMonth
        }

        return +bDay - +aDay
      })
      setFilterState(filteredFinalData)
    },
  })

  return [filterStateData, setFilterState] as const
}
