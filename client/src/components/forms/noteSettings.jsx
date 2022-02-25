import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Notification from '../modal/notification'
import Spinner from '../common/spinner'
import Radio from '../formElements/radio'
import { useDispatch } from 'react-redux'
import { updateNote } from '../../store/noteSlice'

const NoteSettings = ({hideModal, note}) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const [data, setData] = useState({...note, public: note.isPublic.toString()})

  const handleChange = (field) => {
    setData(prev => ({
      ...prev,
      [field.name]: field.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(updateNote({...data, isPublic: data.public === 'true'}))
    hideModal()
  }

  const handleCancel = () => {
    hideModal()
  }

  return (
    <Notification onRemoveModal={handleCancel}>
      <form onSubmit={handleSubmit}
            className="form">

        <h1 className="form__title">{t('NOTE')}</h1>

        {data
          ? <>
            <Radio name="public"
                   label={t('ACCESS')}
                   onChange={handleChange}
                   radioButtons={[
                     {label: t('PRIVATE'), checked: data.public === 'false', value: 'false'},
                     {label: t('PUBLIC'), checked: data.public === 'true', value: 'true'}
                   ]}/>
          </>

          : <Spinner/>}

        <div className="btn-block">
          <button type="button"
                  className="btn btn--primary w-33"
                  onClick={handleCancel}>
            {t('CANCEL')}
          </button>

          <button type="submit"
                  className="btn btn--secondary w-33">
            {t('SAVE')}
          </button>
        </div>
      </form>

    </Notification>
  )
}

export default NoteSettings
