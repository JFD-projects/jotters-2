import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import TextInputLogin from '../../../formElements/textInputLogin.jsx'
import Spinner from '../../../common/spinner'
import Notification from '../../../modal/notification'
import { useLogin } from '../../../../hooks/useLogin'
import {
  getCurrentUser,
  getErrorMessage,
  getLoadingStatus,
  resetErrors,
  updateCurrentUser
} from '../../../../store/authSlice'
import { generateUserData } from '../../../../utils/helpers'

const ProfileForm = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {data, isValidForm, reset, setFormType, setData} = useLogin()
  const serverErrorMessage = useSelector(getErrorMessage())
  const isLoading = useSelector((getLoadingStatus()))
  const [isSubmitted, setIsSubmitted] = useState(false)
  const currentUser = useSelector(getCurrentUser())
  const history = useHistory()

  const [imageIsLoading, setImageIsLoading] = useState(true)

  useEffect(() => {
    setFormType('profile')
  }, [])

  useEffect(() => {
    if (isLoading) {
      return
    }
    // Close form only if form is submitted and no errors were caught
    if (isSubmitted && !serverErrorMessage) {
      handleCancel()
    }
    setIsSubmitted(false)
  }, [isLoading])


  useEffect(() => {
    if (currentUser) {
      setData({
        name: currentUser.name,
        image: currentUser.image
      })
    }
  }, [currentUser])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isValidForm) return

    dispatch(updateCurrentUser(data))
    setIsSubmitted(true)
  }

  const handleCancel = () => {
    reset()
    dispatch(resetErrors())
    history.goBack()
  }

  const randomChangeImage = () => {
    setData(prev => ({
      ...prev,
      image: generateUserData().image
    }))
    setImageIsLoading(true)
  }

  if (!data) {
    return <Spinner/>
  }

  const imageLoaded = () => {
    setImageIsLoading(false)
  }

  return (
    <Notification onRemoveModal={handleCancel}>
      <form onSubmit={handleSubmit}
            className="form">

        <h1 className="form__title">
          {`${t('PROFILE')} ${currentUser.email}`}
        </h1>

        <figure className="form__user-image">
          {imageIsLoading
            && <Spinner/>}

            <img src={data.image}
                 alt="Authenticated user"
                 onClick={randomChangeImage}
                 onLoad={imageLoaded}/>

          <figcaption>{t('CLICK_TO_CHANGE')}</figcaption>
        </figure>

        <TextInputLogin name="name"
                        label={t('NAME')}/>

        {serverErrorMessage &&
        <p className="form__server-error-message">
          {t(serverErrorMessage.toString())}
        </p>}

        <div className="btn-block">
          <button type="button"
                  className="btn btn--primary w-33"
                  onClick={handleCancel}>
            {t('CANCEL')}
          </button>

          <button type="submit"
                  disabled={!isValidForm}
                  className="btn btn--secondary w-33">
            {t('SUBMIT')}
          </button>
        </div>
      </form>
    </Notification>
  )
}

export default ProfileForm
