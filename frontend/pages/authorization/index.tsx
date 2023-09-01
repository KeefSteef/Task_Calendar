import Image from 'next/image'
import { useState } from 'react'
import cls from './Authorization.module.scss'
import { NextPage } from 'next'
import Login from '../../components/Login'
import Register from '../../components/Register'
import { AnimatePresence, motion } from 'framer-motion'
import { loginMotion, registerMotion } from '../../motion'

const Authorization: NextPage = () => {
  const [currentForm, changeForm] = useState<'login' | 'register'>('login')
  return (
    <div className={cls.auth_container}>
      <motion.div
        animate={{ x: currentForm === 'register' ? '100%' : '0%' }}
        transition={{ duration: 0.5 }}
        className={cls.auth_form}
      >
        <AnimatePresence mode={'wait'}>
          {currentForm === 'login' && (
            <motion.div
              key="login"
              variants={loginMotion}
              initial={'initial'}
              animate={'enter'}
              transition={{ duration: 0.3 }}
              exit={'exit'}
            >
              <Login changeForm={() => changeForm('register')} />
            </motion.div>
          )}

          {currentForm === 'register' && (
            <motion.div
              key="register"
              variants={registerMotion}
              initial={'initial'}
              animate={'enter'}
              transition={{ duration: 0.3 }}
              exit={'exit'}
            >
              <Register changeForm={() => changeForm('login')} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className={cls.auth_img_container}>
        <Image objectFit={'cover'} src={'/tiny.png'} layout={'fill'} alt={'tiny'} />
      </div>
    </div>
  )
}

export default Authorization
