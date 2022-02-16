import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Notification from '../modal/notification'
import Spinner from '../common/spinner'
import Radio from '../formElements/radio'

const NoteSettings = ({header, settingsData, onSubmit, onRemoveModal}) => {
  const {t} = useTranslation()
  const [data, setData] = useState({...settingsData, public: settingsData.isPublic.toString()})

  const handleChange = (field) => {
    setData(prev => ({
      ...prev,
      [field.name]: field.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({...data, isPublic: data.public === 'true'})
    onRemoveModal()
  }

  return (
    <Notification onRemoveModal={onRemoveModal}>
      <form onSubmit={handleSubmit}
            className="form">

        <h1 className="form__title">{header}</h1>

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
                  onClick={onRemoveModal}>
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
