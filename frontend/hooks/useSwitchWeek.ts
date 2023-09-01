import moment from 'moment'

interface IUseSwitchWeek {
  weekDaysList: string[]
  currentDay: string
}

export const useSwitchWeekOrDay = (dayIndex: number, mode: string): IUseSwitchWeek => {
  const DAY_FORMAT: string = 'D.M.Y'
  const currentDay: string = moment().format(DAY_FORMAT)

  const getDayByIndex = (): string[] => {
    return [moment().add(dayIndex, 'd').format(DAY_FORMAT)]
  }

  const getWeekListByIndex = (): string[] => {
    const weekDaysList: string[] = []

    const startOfWeek = (count: number): string => {
      const today = moment()
      return today.startOf('week').add(count, 'day').format(DAY_FORMAT)
    }

    for (let i = dayIndex; i < dayIndex + 7; i++) {
      weekDaysList.push(startOfWeek(i))
    }

    return weekDaysList
  }

  return {
    weekDaysList: mode === 'week' ? getWeekListByIndex() : getDayByIndex(),
    currentDay,
  }
}
