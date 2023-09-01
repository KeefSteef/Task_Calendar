import { useMutation } from '@apollo/client'
import { REGISTER_MUTATION } from '../../../graphql/Mutations'
import { IRegData, RegisterErrorType } from '../types'
import { errorValidationSubmit } from '../../../services/ErrorValidationSubmit'
import { v4 as uuidv4 } from 'uuid'
import { useToast } from '../../../hooks/useToast'

export function useRegister() {
  const [createUser] = useMutation(REGISTER_MUTATION)
  const { toast } = useToast()

  const addUser = (data: IRegData) => {
    return createUser({
      variables: {
        registerInput: {
          ...data,
        },
      },
    }).then(() =>
      toast({
        type: 'success',
        id: uuidv4(),
        message: 'Registration success',
      })
    )
  }

  const onSubmit = (data: IRegData) => {
    const { username, email, password } = data
    addUser({
      email,
      password,
      username,
    })
  }

  const onError = (errors: RegisterErrorType) => {
    errorValidationSubmit(errors, toast)
  }

  return {
    onSubmit,
    onError,
  }
}
