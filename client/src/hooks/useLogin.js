import React, { createContext, useContext, useState } from 'react'
import { validateValue } from '../utils/validator'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getCurrentUser, getIsLoggedIn } from '../store/authSlice'

const LoginContext = createContext()

export const useLogin = () => useContext(LoginContext)

const FORM_REGISTER = 'register'
const FORM_LOGIN = 'login'
const FORM_PROFILE = 'profile'
const FORM_LOGOUT = 'logout'

const initUser = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: ''
}

const LoginProvider = ({children}) => {
  const {t} = useTranslation()
  const [formType, setFormType] = useState(null)
  const [data, setData] = useState(initUser)
  const [errors, setErrors] = useState({})
  const [isTouched, setIsTouched] = useState({})
  const isValidForm = Object.values(errors).every(i => !Boolean(i))
  const currentUser = useSelector(getCurrentUser())
  const isLoggedIn = useSelector(getIsLoggedIn())

  const updateErrors = (name) => {
    const value = data[name]
    const config = selectConfig(formType, name)
    const error = validateValue(value, config)
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  const reset = () => {
    setData(initUser)
    setIsTouched({})
  }

  const selectConfig = (formType, name) => {
    switch (formType) {
      case FORM_REGISTER:
        return validatorConfigRegister[name]
      case FORM_LOGIN:
        return validatorConfigLogin[name]
      case FORM_PROFILE:
        return validatorConfigRegister[name]
      default:
        return validatorConfigRegister[name]
    }
  }

  //============================= VALIDATOR CONFIGS =========================
  const validatorConfigRegister = {
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

  const validatorConfigLogin = {
    email: {
      isRequired: {message: t('EMAIL_REQUIRED')},
      isEmail: {message: t('EMAIL_WRONG')}
    },
    password: {
      isRequired: {message: t('PASSWORD_REQUIRED')}
    }
  }

  //================================ PARAMS.DROPDOWN_BTN =======================
  const img = isLoggedIn
    ? <img src={currentUser?.image}
           className="dropdown__icon"
           alt="Authenticated user"/>
    : <svg className="dropdown__icon">
      <use xlinkHref="/sprite.svg#icon-circle-down"/>
    </svg>

  const paramsDropdownBtn = {
    img,
    title: t('LOGIN'),
    label: currentUser?.name ?? t('LOG_IN'),
    isBig: isLoggedIn
  }

  paramsDropdownBtn.items = [
    {
      action: FORM_LOGIN,
      title: t('LOG_IN'),
      img: <svg className="dropdown-item__icon">
        <use xlinkHref="/sprite.svg#icon-login"/>
      </svg>,
      disabled: isLoggedIn
    },
    {
      action: FORM_REGISTER,
      title: t('REGISTER'),
      img: <svg className="dropdown-item__icon">
        <use xlinkHref="/sprite.svg#icon-clipboard"/>
      </svg>,
      disabled: isLoggedIn
    },
    {
      action: FORM_PROFILE,
      title: t('PROFILE'),
      img: <svg className="dropdown-item__icon">
        <use xlinkHref="/sprite.svg#icon-profile"/>
      </svg>,
      disabled: !isLoggedIn
    },
    {
      action: FORM_LOGOUT,
      title: t('LOG_OUT'),
      img: <svg className="dropdown-item__icon">
        <use xlinkHref="/sprite.svg#icon-logout"/>
      </svg>,
      disabled: !isLoggedIn
    }
  ]

  return (
    <LoginContext.Provider
      value={{
        data, setData,
        errors, setErrors,
        isTouched, setIsTouched,
        isValidForm, updateErrors, reset,
        paramsDropdownBtn,
        setFormType
      }}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginProvider
