import { ChangeEvent, FC } from 'react'
import cls from './Register.module.scss'
import FormInput from '../Ui/FormInput/FormInput'
import FormButton from '../Ui/FormButton/FormButton'
import { useRegister } from './hooks/useRegister'
import { Controller, useForm, useFormState } from 'react-hook-form'
import { RegisterErrorType, IRegister, IRegisterFields } from './types'

const Register: FC<IRegister> = ({ changeForm }) => {
  const { control, handleSubmit } = useForm<IRegisterFields>({
    mode: 'onSubmit',
  })
  const { errors } = useFormState({ control })
  const { onSubmit, onError } = useRegister()
  return (
    <div className={cls.register_container}>
      <div className={cls.register_info}>
        <h1>Register</h1>
        <form
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            () => onError(errors as RegisterErrorType)
          )}
          className={cls.register_form}
        >
          <Controller
            control={control}
            name={'username'}
            rules={{
              required: 'Username field is empty',

              pattern: {
                value: /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,

                message: 'Please enter a valid username',
              },
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <FormInput
                  onChangeHandler={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                  value={value}
                  labelText={'Username'}
                  placeholder={'Username'}
                  isValidMsg={errors.username?.message}
                />
              )
            }}
          ></Controller>
          <Controller
            control={control}
            name={'email'}
            rules={{
              required: 'Email field is empty',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
              },
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <FormInput
                  onChangeHandler={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                  value={value}
                  labelText={'E-mail'}
                  placeholder={'E-mail'}
                  isValidMsg={errors.email?.message}
                />
              )
            }}
          ></Controller>
          <Controller
            control={control}
            name={'password'}
            rules={{
              required: 'Password field is empty',

              minLength: {
                value: 5,
                message: 'Minimal length is 5 symbol',
              },
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <FormInput
                  onChangeHandler={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                  value={value}
                  isHidden
                  labelText={'Password'}
                  placeholder={'Password'}
                  isValidMsg={errors.password?.message}
                />
              )
            }}
          ></Controller>
          <div className={cls.btn}>
            <FormButton isSubmit>Sign up</FormButton>
          </div>
          <div className={cls.to_log}>
            <p>
              Have account? <span onClick={changeForm}>Sign in!</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
