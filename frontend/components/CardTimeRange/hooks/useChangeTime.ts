import { parsePxToTime } from '../../../utils'

interface ICardTimeRange {
  top: number
  size: number
}

export function useChangeTime(props: ICardTimeRange) {
  let { size, top } = props
  const start = parsePxToTime(top)
  const end = parsePxToTime(size + top)
  return {
    startTime: start,
    endTime: end,
  }
}
