import { removeCookies } from 'cookies-next'

export const useExit = () => {
  const doExit = () => {
    localStorage.setItem('user', '')
    removeCookies('client-token')
  }

  return {
    doExit,
  }
}
