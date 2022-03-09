import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import DropdownBtn from '../../formElements/dropdownBtn'

const languages = [
  {code: 'en', name: 'English', flagImg: '/sprite.svg#icon-flag-en'},
  {code: 'ru', name: 'Русский', flagImg: '/sprite.svg#icon-flag-ru'}
]

const LanguageBtn = () => {
  const currentLanguageCode = localStorage.getItem('i18nextLng') || 'en'
  const currentLanguage = languages.find(({code}) => code === currentLanguageCode)

  const {t} = useTranslation()

  useEffect(() => {
    document.title = t('JOTTERS')
  }, [currentLanguage])

  //========= DropdownBtn ============
  const paramsDropdownBtn = {
    img: <svg className="dropdown__icon">
      <use xlinkHref="/sprite.svg#icon-earth"/>
    </svg>,
    title: t('LANGUAGE'),
    items: languages.map(l => ({
      action: l.code,
      title: l.name,
      img: <svg className="dropdown-item__icon">
        <use xlinkHref={l.flagImg}/>
      </svg>,
      disabled: l.code === currentLanguage.code
    }))
  }
  //===================================

  return (
    <DropdownBtn params={paramsDropdownBtn}/>
  )
}

export default LanguageBtn
