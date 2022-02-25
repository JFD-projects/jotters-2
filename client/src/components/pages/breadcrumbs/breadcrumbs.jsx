import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getBreadcrumbs } from '../../../store/breadcrumbsSlice'
import { useTranslation } from 'react-i18next'

const Breadcrumbs = () => {
  const {t} = useTranslation()
  const crumbs = useSelector(getBreadcrumbs())

  return (
    <nav className="crumbs">
      {crumbs.map(({to, label}, i) => (
        i + 1 === crumbs.length
          ? <span key={i}
                  className="crumbs__last">
            {t(label)}
          </span>
          : <>
            <Link key={i}
                  className="crumbs__item"
                  to={to}>
              {t(label)}
            </Link>
            <span className='crumbs__icon'>
              <svg>
                <use xlinkHref="/sprite.svg#icon-chevron-left"/>
              </svg>
            </span>
          </>
      ))}
    </nav>
  )
}

export default Breadcrumbs
