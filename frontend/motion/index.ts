interface IMotion {
  opacity: number;
  x: number;
}

type motionObjects = "initial" | "enter" | "exit";
type motionRecordType = Record<motionObjects, IMotion>;

export const loginMotion: motionRecordType = {
  initial: {
    opacity: 0,
    x: -100,
  },

  enter: {
    opacity: 1,
    x: 0,
  },

  exit: {
    opacity: 0,
    x: 100,
  },
};

export const registerMotion: motionRecordType = {
  initial: {
    opacity: 0,
    x: 150,
  },

  enter: {
    opacity: 1,
    x: 0,
  },

  exit: {
    opacity: 0,
    x: -100,
  },
};
