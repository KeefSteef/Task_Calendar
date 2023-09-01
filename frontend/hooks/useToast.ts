import { toastStore } from '../store/ToastStore'
import { IToast } from '../types/toast'

export const useToast = () => {
  const toast = (toastData: IToast): void => {
    toastStore.addToast(toastData)
  }

  const removeToast = (id: string): void => {
    toastStore.removeToast(id)
  }

  return {
    toast,
    removeToast,
  }
}
