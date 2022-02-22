import React from 'react'
import { Link } from 'react-router-dom'
import { dateToString } from '../../../../utils/dateToString'
import { useTranslation } from 'react-i18next'
import DropdownBtn from '../../../formElements/dropdownBtn_old'

const JotterCard = ({jotter, paramsDropdownBtn}) => {
  const {t} = useTranslation()

  const onClickDropdownBtn = (action) => {
    paramsDropdownBtn.onClick(action, jotter)
  }

  const newParamsDropdownBtn = {...paramsDropdownBtn, onClick: onClickDropdownBtn}

  if (jotter.notesNumber > 0) {
    newParamsDropdownBtn.items = newParamsDropdownBtn.items.map(i => {
      if (i.action === 'delete') {
        return {...i, disabled: true}
      }
      return i
    })
  }

  return (
    <div className="card-container">

      <DropdownBtn params={newParamsDropdownBtn}/>

      <Link to={`/jotters/${jotter._id}`}
            className="card card--jotter"
            style={{background: jotter.color}}>

        <p className="card--jotter__title">{jotter.title}</p>

        <p className="card--jotter__text">
          {`${t('NOTES_COUNT')}: ${jotter.notesNumber}`}
        </p>

        <p className="card--jotter__date">
          {`${t('CHANGED')}: ${dateToString(jotter.updatedAt)}`}
        </p>

      </Link>
    </div>
  )
}

export default JotterCard
