interface IMotion {
  opacity: number
  x?: number
  y?: number
}

type motionObjects = 'initial' | 'enter' | 'exit'
type motionRecordType = Record<motionObjects, IMotion>

export const toastMotion: motionRecordType = {
  initial: {
    opacity: 0,
    y: 10,
  },

  enter: {
    opacity: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    y: 20,
  },
}
