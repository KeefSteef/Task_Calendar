import { RefObject, useEffect, useRef } from 'react'

type UseOutsideClickFuncType = (callback: Function, exceptionClass?: string) => RefObject<any>

export const useOutsideClick: UseOutsideClickFuncType = (callback, exceptionClass = '') => {
  const ref = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    const handleClick = (event: Event) => {
      const target = event.target as Element
      if (ref.current && (!exceptionClass || !target.className.includes(exceptionClass))) {
        callback()
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref])

  return ref
}
