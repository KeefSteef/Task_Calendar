import moment from 'moment'

const FORMAT = 'D.M.Y'

export const useMonth = (monthIndex: number) => {
  const firstDayMonth = moment().add(monthIndex, 'month').startOf('month')
  const monthDaysCount = firstDayMonth.daysInMonth()
  const firstDayMonthIndex = firstDayMonth.day()
  const monthAndYearFormat = firstDayMonth.format('MMMM YYYY')
  const currentMonthIndex = firstDayMonth.format('M')

  const prevMonthDays = []
  const currentMonthDays = []
  const nextMonthDays = []

  for (let i = firstDayMonthIndex; i !== 0; i--) {
    prevMonthDays.push(moment(firstDayMonth).subtract(i, 'day').format(FORMAT))
  }

  for (let i = 0; i < monthDaysCount; i++) {
    const date = moment(firstDayMonth).add(i, 'day').format(FORMAT)
    currentMonthDays.push(date)
  }

  for (let i = 0; i < 42 - [...prevMonthDays, ...currentMonthDays].length; i++) {
    const date = moment(firstDayMonth).add(1, 'month').add(i, 'day').format(FORMAT)

    nextMonthDays.push(date)
  }

  return {
    daysMonth: [...prevMonthDays, ...currentMonthDays, ...nextMonthDays],
    monthAndYearFormat,
    currentMonthIndex,
  }
}
