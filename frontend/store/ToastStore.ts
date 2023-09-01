import { IToast } from '../types/toast'

export let toasts: IToast[] = []
let listeners: Set<Function> = new Set()

export const toastStore = {
  addToast(toast: IToast) {
    toasts = toast.type === 'success' ? [toast] : [...toasts, toast]
    emitChange()
  },

  removeToast(id: string) {
    toasts = toasts.filter((toast: IToast) => toast.id !== id)
    emitChange()
  },

  subscribe(listener: Function) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  getToasts() {
    return toasts
  },
}

function emitChange() {
  for (let listener of listeners) {
    listener()
  }
}
