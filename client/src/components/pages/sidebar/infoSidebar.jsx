import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Sidebar from './common/sidebar'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../../store/authSlice'

const InfoSidebar = ({...rest}) => {
  const {t} = useTranslation()
  const isLoggedIn = useSelector(getIsLoggedIn())

  return (
    <Sidebar {...rest}>
      <Link to="/public"
            className="btn btn--primary">
        {t('TO_PUBLIC')}
      </Link>

      <Link to="/jotters"
            className={'btn btn--secondary' + (isLoggedIn ? '' : ' btn--disabled')}>
        {t('TO_PRIVATE')}
      </Link>
    </Sidebar>
  )
}

export default InfoSidebar
