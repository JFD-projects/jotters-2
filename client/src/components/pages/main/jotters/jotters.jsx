import React from 'react'
import JotterCard from './jotterCard'
import Spinner from '../../../common/spinner'
import { useTranslation } from 'react-i18next'

const Jotters = ({jotters, paramsDropdownBtn, onAddNewJotter}) => {
  const {t} = useTranslation()

  return (
    <div className="cards-container">
      {jotters
        ? jotters.map(jotter => <JotterCard key={jotter._id}
                                            jotter={jotter}
                                            paramsDropdownBtn={paramsDropdownBtn}/>)
        : <Spinner/>
      }

      <div className="card card--new-jotter">
        <button className="btn btn--secondary"
                onClick={onAddNewJotter}>
          {t('NEW_JOTTER')}
        </button>
      </div>
    </div>
  )
}

export default Jotters
