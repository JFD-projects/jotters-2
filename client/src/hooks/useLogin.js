import React, {createContext, useContext, useState} from 'react'
import {validateValue} from '../utils/validator'
import {useTranslation} from 'react-i18next'

const LoginContext = createContext()

export const useLogin = () => useContext(LoginContext)

const initUser = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: ''
}

const LoginProvider = ({children}) => {
  const {t} = useTranslation()
  const [data, setData] = useState(initUser)
  const [errors, setErrors] = useState({})
  const [isTouched, setIsTouched] = useState({})
  const isValidForm = Object.values(errors).every(i => !Boolean(i))

  const validatorConfig = {
    name: {
      isRequired: {message: t('NAME_REQUIRED')},
      min: {message: t('NAME_MIN', {num: 3}), value: 3}
    },
    email: {
      isRequired: {message: t('EMAIL_REQUIRED')},
      isEmail: {message: t('EMAIL_WRONG')}
    },
    password: {
      isRequired: {message: t('PASSWORD_REQUIRED')},
      hasCapital: {message: t('PASSWORD_HAS_CAPITAL')},
      hasNumber: {message: t('PASSWORD_HAS_NUMBER')},
      min: {message: t('PASSWORD_MIN', {num: 8}), value: 8}
    },
    passwordConfirm: {
      isRequired: {message: t('PASSWORD_REQUIRED')},
      match: {message: t('PASSWORD_MISMATCH'), value: data.password}
    }
  }

  const updateErrors = (name) => {
    const error = validateValue(data[name], validatorConfig[name])
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  const reset = () => {
    setData(initUser)
    setIsTouched({})
  }

  return (
    <LoginContext.Provider
      value={{data, setData, errors, setErrors, isTouched, setIsTouched, isValidForm, updateErrors, reset}}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginProvider
