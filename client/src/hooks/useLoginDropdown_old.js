import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import LoginForm from '../components/pages/header/login/loginForm'
import RegisterForm from '../components/pages/header/login/registerForm'
import LogoutForm from '../components/pages/header/login/logoutForm'
import { useSelector } from 'react-redux'
import { getCurrentUser, getIsLoggedIn } from '../store/authSlice'
import ProfileForm from '../components/pages/header/login/profileForm'
import { useLogin } from './useLogin'

const useLoginDropdown_old = () => {
  const {t} = useTranslation()
  const [renderLoginCard, setRenderLoginCard] = useState(null)
  const currentUser = useSelector(getCurrentUser())
  const isLoggedIn = useSelector(getIsLoggedIn())
  const {setFormType} = useLogin()

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
    onClick: handleDropdownBtn,
    isBig: isLoggedIn
  }

  paramsDropdownBtn.items = [
    {
      action: 'login',
      title: t('LOG_IN'),
      img: <svg className="dropdown-item__icon">
        <use xlinkHref="/sprite.svg#icon-login"/>
      </svg>,
      disabled: isLoggedIn
    },
    {
      action: 'register',
      title: t('REGISTER'),
      img: <svg className="dropdown-item__icon">
        <use xlinkHref="/sprite.svg#icon-clipboard"/>
      </svg>,
      disabled: isLoggedIn
    },
    {
      action: 'profile',
      title: t('PROFILE'),
      img: <svg className="dropdown-item__icon">
        <use xlinkHref="/sprite.svg#icon-profile"/>
      </svg>,
      disabled: !isLoggedIn
    },
    {
      action: 'logout',
      title: t('LOG_OUT'),
      img: <svg className="dropdown-item__icon">
        <use xlinkHref="/sprite.svg#icon-logout"/>
      </svg>,
      disabled: !isLoggedIn
    }
  ]

  function handleDropdownBtn(action) {
    switch (action) {
      case 'login':
        setRenderLoginCard(<LoginForm onRemoveModal={hideAllCards}/>)
        setFormType('login')
        break
      case 'register':
        setRenderLoginCard(<RegisterForm onRemoveModal={hideAllCards}/>)
        setFormType('register')
        break
      case 'profile':
        setRenderLoginCard(<ProfileForm onRemoveModal={hideAllCards}/>)
        setFormType('profile')
        break
      case 'logout':
        setRenderLoginCard(<LogoutForm onRemoveModal={hideAllCards}/>)
        setFormType('logout')
        break
      default:
        setRenderLoginCard(null)
    }
  }

  const hideAllCards = () => {
    setRenderLoginCard(null)
  }

  return {paramsDropdownBtn, renderLoginCard}
}

export default useLoginDropdown_old
