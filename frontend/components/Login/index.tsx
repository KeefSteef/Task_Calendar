import React, {ChangeEvent, FC} from 'react'
import cls from './Login.module.scss'
import FormInput from '../../components/Ui/FormInput/FormInput'
import FormButton from '../../components/Ui/FormButton/FormButton'
import Checkbox from '../../components/Ui/Checkbox'
import {useLogin} from './hooks/useLogin'
import {Controller, useForm, useFormState} from 'react-hook-form'
import {LoginErrorType} from './types'

interface ILogin {
    changeForm: () => void
}

interface ILoginField {
    email: string
    password: string
}

const Login: FC<ILogin> = ({changeForm}) => {
    const {control, handleSubmit} = useForm<ILoginField>({mode: 'onSubmit'})
    const {errors} = useFormState({control})
    const {fetchUser, onError} = useLogin()
    return (
        <div className={cls.login_form_container}>
            <div className={cls.login_info}>
                <h1>Welcome back!</h1>
                <small>Please enter your details.</small>
            </div>
            <form
                className={cls.form}
                onSubmit={handleSubmit(
                    (data) => fetchUser(data),
                    () => onError(errors as LoginErrorType)
                )}
            >
                <div className={cls.form_fields}>
                    <Controller
                        name={'email'}
                        control={control}
                        rules={{
                            required: 'Email field is empty',
                            pattern: {
                                value:
                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid email',
                            },
                        }}
                        render={({field: {onChange, value}}) => {
                            return (
                                <FormInput
                                    value={value}
                                    onChangeHandler={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                                    placeholder={'Enter your email'}
                                    labelText={'E-mail'}
                                    isValidMsg={errors.email?.message}
                                />
                            )
                        }}
                    />
                    <Controller
                        name={'password'}
                        control={control}
                        rules={{
                            required: 'Password field is empty',

                            minLength: {
                                value: 5,
                                message: 'Minimal length is 5 symbol',
                            },
                        }}
                        render={({field: {onChange, value}}) => {
                            return (
                                <FormInput
                                    isHidden
                                    value={value}
                                    onChangeHandler={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                                    placeholder={'Password'}
                                    labelText={'Password'}
                                    isValidMsg={errors.password?.message}
                                />
                            )
                        }}
                    />
                </div>
                <div className={cls.tick}>
                    <Checkbox>Remember for 30 days</Checkbox>
                </div>
                <div className={cls.form_submit}>
                    <FormButton isSubmit>Sign in</FormButton>
                </div>
            </form>

            <div className={cls.to_reg}>
                <p>
                    Do not have an account? <span onClick={changeForm}>Sign up for free!</span>
                </p>
            </div>
        </div>
    )
}

export default Login
