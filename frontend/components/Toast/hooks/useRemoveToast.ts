import { useEffect, useRef } from 'react'
import { useToast } from '../../../hooks/useToast'

interface IUserRemoveToast {
  id: string
}

export const useRemoveToast = (id: string, setShow: Function) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { removeToast } = useToast()
  useEffect(() => {
    timer.current = setTimeout(() => {
      setShow(false)
    }, 5000)

    return () => {
      window.clearTimeout(timer.current as ReturnType<typeof setTimeout>)
    }
  }, [setShow])

  return {
    removeToastHandler: removeToast,
  }
}
