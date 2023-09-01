import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '../../../graphql/Mutations'
import { errorValidationSubmit } from '../../../services/ErrorValidationSubmit'
import { v4 as uuid4 } from 'uuid'
import { LoginErrorType } from '../types'
import { useToast } from '../../../hooks/useToast'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'

interface ILoginData {
  email: string
  password: string
}

interface ILoginResponseData {
  email: string
  token: string
  username: string
}

export function useLogin() {
  const [loginUser] = useMutation(LOGIN_MUTATION)
  const router = useRouter()
  const { toast } = useToast()

  const fetchUser = (data: ILoginData) => {
    loginUser({
      variables: {
        loginInput: {
          ...data,
        },
      },
    })
      .then((response) => {
        const { email, token }: ILoginResponseData = response.data.loginUser
        setCookie('client-token', token)
        localStorage.setItem('user', email)
        router.push('/calendar')
      })
      .catch(() => {
        toast({
          id: uuid4(),
          type: 'error',
          message: `Oops...something was wrong`,
        })
      })
  }

  const onError = (errors: LoginErrorType) => {
    errorValidationSubmit(errors, toast)
  }

  return {
    fetchUser,
    onError,
  }
}
