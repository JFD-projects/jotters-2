import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Sidebar from './common/sidebar'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../../../store/authSlice'

const PublicNoteSidebar = ({note, isMobile, hideSidebar, ...rest}) => {
  const {t} = useTranslation()
  const currentUser = useSelector(getCurrentUser())
  const isOwnNote = note?.userId === currentUser?._id

  return (
    <Sidebar {...{isMobile, hideSidebar, ...rest}}>
      <Link to="/public"
            className="btn btn--primary">
        <svg>
          <use xlinkHref="/sprite.svg#icon-chevron-left"/>
        </svg>
        <span>{t('PUBLIC_NOTES')}</span>
      </Link>

      {isOwnNote &&
      <Link to={'/jotters/' + note?.jotterId + '/' + note?._id}
            className="btn btn--secondary">
        <span>{t('TO_PRIVATE')}</span>
      </Link>
      }
    </Sidebar>
  )
}

export default PublicNoteSidebar
