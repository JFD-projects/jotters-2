import React, {useState} from 'react'
import Notification from '../modal/notification'
import {useTranslation} from 'react-i18next'
import Spinner from '../common/spinner'
import TextInput from '../formElements/textInput'
import ColorPicker from '../formElements/colorPicker'

const JotterSettings = ({header, settingsData, onSubmit, onHideModal}) => {
  const {t} = useTranslation()
  const [data, setData] = useState(settingsData)

  const handleChange = (field) => {
    setData(prev => ({
      ...prev,
      [field.name]: field.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(data)
    onHideModal()
  }

  return (
    <Notification onRemoveModal={onHideModal}>
      <form onSubmit={handleSubmit}
            className="form">

        <h1 className="form__title">{header}</h1>

        {data
          ? <>
            <TextInput name="title"
                       label={t('JOTTER_NAME')}
                       value={data.title}
                       onChange={handleChange}
                       error=""/>

            <ColorPicker name="color"
                         label={t('COLOR')}
                         value={data.color}
                         colors={['#CCC', '#FCC', '#CFC', '#CCF', '#FFC', '#FCF', '#CFF']}
                         onChange={handleChange}/>
          </>

          : <Spinner/>}

        <div className="btn-block">
          <button type="button"
                  className="btn btn--primary w-33"
                  onClick={onHideModal}>
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

export default JotterSettings
