import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import logo from '../../../assets/images/notebook.svg'

import LanguageBtn from './languageBtn'
import { Link } from 'react-router-dom'
import LoginBtn from './login/loginBtn'
import LoginProvider from '../../../hooks/useLogin'

const Header = ({title, navSidebar}) => {
  const {t} = useTranslation()

  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false)

  const showSidebar = () => {
    setIsVisibleSidebar(true)
  }

  const hideSidebar = () => {
    setIsVisibleSidebar(false)
  }

  return (
    <>
      <header className="header">
        <button onClick={showSidebar} className="btn btn--menu" type="button">
          <svg>
            <use xlinkHref="/sprite.svg#icon-menu"/>
          </svg>
        </button>

        <Link to="/info" className="btn btn--logo" type="button">
          <img src={logo} alt="Logo Jotter"/>
        </Link>

        <h1 className="h1 header__title">
          {title || t('JOTTERS')}
        </h1>

        <LoginProvider>
          <LoginBtn/>
        </LoginProvider>

        <LanguageBtn/>
      </header>

      {isVisibleSidebar && navSidebar(hideSidebar)}
    </>
  )
}

export default Header
