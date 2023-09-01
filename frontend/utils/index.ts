import moment from 'moment'

interface IElementWithHandler {
  cardProps: {
    timeStart: number
    timeEnd: number
    timeFormat: string
  }
}

export const parsePxToTime = (value: number) => {
  let hour: number | string = Math.floor(value / 80)
  let minutes = ((0.0075 * value) % 0.5999).toFixed(2).slice(2)
  let format = hour >= 12 ? 'PM' : 'AM'

  if (hour === 0 || hour === 24) {
    hour = '12'
    format = 'AM'
  } else if (hour > 12) {
    hour -= 12
    format = 'PM'
  }
  return `${hour}${+minutes ? ':' : ''}${+minutes ? minutes : ''}${format}`
}

export const parseTimeToPx = (time: string) => {
  const format = time.slice(-2)
  let hours = +(time.includes(':') ? time.slice(0, -5) : time.slice(0, -2))
  let minutes = +(time.includes(':') ? time.split(':')[1].slice(0, -2) : 0)
  minutes = Math.round(minutes * 1.33)

  if (hours !== 12 && format === 'PM') {
    hours += 12
  } else if (hours === 12 && format === 'AM') {
    hours = 0
  }

  return hours * 80 + minutes
}

export const getTopAndHeightFromTime = (timeStart: string, timeEnd: string) => {
  const cardStart = parseTimeToPx(timeStart)
  const cardHeight = parseTimeToPx(timeEnd) || 1920
  return {
    height: cardHeight,
    top: cardStart,
  }
}

export const isObjectsCompare = (firstOjb: object, secondObj: object) => {
  return JSON.stringify(firstOjb) === JSON.stringify(secondObj)
}

export const parseDateToBoardFormat = (dateOfDMYFormat: string) => {
  const [day, month, year]: string[] = dateOfDMYFormat.split('.')
  return moment()
    .month(+month - 1)
    .year(+year)
    .format(`${day} MMM YYYY`)
}

/*CHAT GPT GENERATED */

export const generateTimeSelectOptions = () => {
  return Array.from({ length: 97 }, (_, i) => i * 15).map((minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    const amPm = hours < 12 || hours === 24 ? 'AM' : 'PM'
    const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
    const formattedMins = mins < 10 ? `0${mins}` : mins

    if (mins === 0) {
      return `${formattedHours}${amPm}`
    }

    return `${formattedHours}:${formattedMins}${amPm}`
  })
}

export const parentSurface = (element: HTMLElement, target: string) => {
  let el = element
  if (el.parentElement) {
    while (el.id !== target) {
      el = el.parentElement!
    }
  }
  return el
}

export const skipSimmilarFormat = (start: string, end: string) => {
  if (start.slice(-2) === end.slice(-2)) {
    const format = end.slice(-2)
    return `${start.slice(0, -2)} - ${end.slice(0, -2)}${format}`
  } else {
    return `${start} - ${end}`
  }
}

export const getRect = (el: HTMLElement) => {
  return {
    x: el.getBoundingClientRect().x,
    y: el.getBoundingClientRect().y,
  }
}
