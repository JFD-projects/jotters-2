import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import DropdownBtn from '../../formElements/dropdownBtn'
import { getCurrentUser, getIsLoggedIn } from '../../../store/authSlice'
import { FORM_LOGIN, FORM_LOGOUT, FORM_PROFILE, FORM_REGISTER } from '../../../utils/helpers'


const LoginBtn = () => {
  const {t} = useTranslation()
  const currentUser = useSelector(getCurrentUser())
  const isLoggedIn = useSelector(getIsLoggedIn())

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
    isBig: isLoggedIn,
    items: [
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
  }
  //================================

  return (
    <>
      <div className="header__user-name">
        {paramsDropdownBtn.label}
      </div>

      <DropdownBtn params={paramsDropdownBtn}/>
    </>
  )
}

export default LoginBtn
