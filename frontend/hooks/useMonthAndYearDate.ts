import moment from 'moment'

interface IUseMonthAndYearDate {
  date: string
}

export const useMonthAndYearDate = (weekDays: string[]): IUseMonthAndYearDate => {
  const [_, firstDateMonth, firstDateYear]: string[] = weekDays[0].split('.')
  const [__, lastDateMonth, lastDateYear]: string[] = weekDays[weekDays.length - 1].split('.')

  const monthIndexToName = (monthIndex: string): string => {
    return moment()
      .month(+monthIndex - 1)
      .format('MMM')
  }

  const getResultDate = (): string => {
    if (firstDateYear !== lastDateYear) {
      return `${monthIndexToName(firstDateMonth)} ${firstDateYear} - ${monthIndexToName(
        lastDateMonth
      )} ${lastDateYear}` /*Dec 2022 - Jan 2023*/
    }
    if (firstDateMonth !== lastDateMonth) {
      return `${monthIndexToName(firstDateMonth)} - ${monthIndexToName(lastDateMonth)} ${firstDateYear}`
    }

    return `${monthIndexToName(firstDateMonth)} ${firstDateYear}`
  }

  return {
    date: getResultDate(),
  }
}
