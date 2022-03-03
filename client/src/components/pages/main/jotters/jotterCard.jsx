import React from 'react'
import { Link } from 'react-router-dom'
import {dateToString, dateToStringForRender} from '../../../../utils/dateToString'
import { useTranslation } from 'react-i18next'
import DropdownBtn from '../../../formElements/dropdownBtn'
import { FORM_DELETE_JOTTER, FORM_JOTTER_SETTINGS } from '../../../../utils/helpers'

const JotterCard = ({jotter}) => {
  const {t} = useTranslation()

  //================================ PARAMS.DROPDOWN_BTN =======================
  const paramsDropdownBtn = {
    img: <svg className="dropdown__icon dropdown__icon--primary">
      <use xlinkHref="/sprite.svg#icon-circle-down"/>
    </svg>,
    title: t('CONTROL'),
    data: jotter,
    items: [
      {
        action: FORM_JOTTER_SETTINGS,
        title: t('SETTINGS'),
        img: <svg className="dropdown-item__icon">
          <use xlinkHref="/sprite.svg#icon-settings"/>
        </svg>,
        disabled: false
      },
      {
        action: FORM_DELETE_JOTTER,
        title: t('DELETE_JOTTER'),
        img: <svg className="dropdown-item__icon">
          <use xlinkHref="/sprite.svg#icon-bin"/>
        </svg>,
        disabled: (jotter.notesNumber > 0)
      }
    ]
  }
  //================================

  return (
    <div className="card-container">
      <Link to={`/jotters/${jotter._id}`}
            className="card card--jotter"
            style={{background: jotter.color}}>

        <p className="card--jotter__title">{jotter.title}</p>

        <p className="card--jotter__text">
          {`${t('NOTES_COUNT')}: ${jotter.notesNumber}`}
        </p>

        <p className="card--jotter__date">
          {`${t('CHANGED')}: ${dateToStringForRender(jotter.updatedAt, Date.now())}`}
        </p>
      </Link>

      <DropdownBtn params={paramsDropdownBtn}/>
    </div>
  )
}

export default JotterCard
