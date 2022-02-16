import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import LoginForm from '../components/pages/header/login/loginForm'
import RegisterForm from '../components/pages/header/login/registerForm'
import LogoutForm from '../components/pages/header/login/logoutForm'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../store/authSlice'

const useLoginDropdown = () => {
  const {t} = useTranslation()
  const [isVisibleLogin, setIsVisibleLogin] = useState(false)
  const [isVisibleRegister, setIsVisibleRegister] = useState(false)
  const [isVisibleLogout, setIsVisibleLogout] = useState(false)
  const currentUser = useSelector(getCurrentUser())

  const paramsDropdownBtn = {
    img: <svg className="dropdown__icon">
      <use xlinkHref="/sprite.svg#icon-circle-down"/>
    </svg>,
    title: t('LOGIN'),
    label: t('LOG_IN'),
    onClick: handleDropdownBtn
  }

  paramsDropdownBtn.items = [
    {
      action: 'login',
      title: t('LOG_IN'),
      img: <svg className="dropdown-item__icon">
        <use xlinkHref="/sprite.svg#icon-login"/>
      </svg>,
      disabled: false
    },
    {
      action: 'register',
      title: t('REGISTER'),
      img: <svg className="dropdown-item__icon">
        <use xlinkHref="/sprite.svg#icon-clipboard"/>
      </svg>,
      disabled: false
    },
    {
      action: 'logout',
      title: t('LOG_OUT'),
      img: <svg className="dropdown-item__icon">
        <use xlinkHref="/sprite.svg#icon-logout"/>
      </svg>,
      disabled: !currentUser
    }
  ]

  function handleDropdownBtn(action) {
    switch (action) {
      case 'login':
        setIsVisibleLogin(true)
        break
      case 'register':
        setIsVisibleRegister(true)
        break
      case 'logout':
        setIsVisibleLogout(true)
        break
      default:

    }
  }

  const hideAllCards = () => {
    setIsVisibleLogin(false)
    setIsVisibleRegister(false)
    setIsVisibleLogout(false)
  }

  const renderLoginCard = (<>

    {isVisibleLogin &&
    <LoginForm onRemoveModal={hideAllCards}/>}

    {isVisibleRegister &&
    <RegisterForm onRemoveModal={hideAllCards}/>}

    {isVisibleLogout &&
    <LogoutForm onRemoveModal={hideAllCards}/>}

  </>)

  return {paramsDropdownBtn, renderLoginCard}
}

export default useLoginDropdown
