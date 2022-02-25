import React, { useState } from 'react'
import Notification from '../modal/notification'
import { useTranslation } from 'react-i18next'
import Spinner from '../common/spinner'
import TextInput from '../formElements/textInput'
import ColorPicker from '../formElements/colorPicker'
import { getCurrentUser, resetErrors } from '../../store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addNewJotter, updateJotter } from '../../store/jotterSlice'

const initialJotter = {
  title: 'New Jotter',
  color: '#CCC'
}

const JotterSettings = ({hideModal, jotter}) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const [data, setData] = useState(jotter ?? initialJotter)
  const currentUser = useSelector(getCurrentUser())

  const handleChange = (field) => {
    setData(prev => ({
      ...prev,
      [field.name]: field.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (data._id) {
      dispatch(updateJotter(data))
    } else {
      dispatch(addNewJotter({...data, userId: currentUser._id}))
    }
    hideModal()
  }

  const handleCancel = () => {
    dispatch(resetErrors())
    hideModal()
  }

  return (
    <Notification onRemoveModal={handleCancel}>
      <form onSubmit={handleSubmit}
            className="form">

        <h1 className="form__title">{t('JOTTER')}</h1>

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

export default JotterSettings
