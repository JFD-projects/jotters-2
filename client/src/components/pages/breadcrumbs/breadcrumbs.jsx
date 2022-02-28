import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getBreadcrumbs } from '../../../store/breadcrumbsSlice'
import { useTranslation } from 'react-i18next'

const Breadcrumbs = () => {
  const crumbs = useSelector(getBreadcrumbs())

  return (
    <nav className="crumbs">
      {crumbs.map(({to, label}, i) => (
        <Crumb key={i} to={to} label={label} last={i + 1 === crumbs.length}/>
        ))}
    </nav>
  )
}

export default Breadcrumbs



const Crumb = ({to, label, last}) => {
  const {t} = useTranslation()

  if (last) {
    return (
      <span className="crumbs__last">
        {t(label)}
      </span>
    )
  }

  return (
    <>
      <Link className="crumbs__item"
            to={to}>
        {t(label)}
      </Link>
      <span className="crumbs__icon">
        <svg>
          <use xlinkHref="/sprite.svg#icon-chevron-left"/>
        </svg>
      </span>
    </>
  )
}
