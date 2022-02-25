import React from 'react'
import JotterCard from './jotterCard'
import Spinner from '../../../common/spinner'
import { useTranslation } from 'react-i18next'
import { showModal } from '../../../../store/modalSlice'
import { useDispatch } from 'react-redux'
import { FORM_JOTTER_SETTINGS } from '../../../../utils/helpers'

const Jotters = ({jotters}) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const handleAddNewJotter = () => {
    dispatch(showModal({currentModal: FORM_JOTTER_SETTINGS}))
  }

  return (
    <div className="cards-container">
      {jotters
        ? jotters.map(jotter => <JotterCard key={jotter._id}
                                            jotter={jotter}/>)
        : <Spinner/>
      }

      <div className="card card--new-jotter">
        <button className="btn btn--secondary"
                onClick={handleAddNewJotter}>
          {t('NEW_JOTTER')}
        </button>
      </div>
    </div>
  )
}

export default Jotters
