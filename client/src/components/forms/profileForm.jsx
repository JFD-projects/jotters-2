import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'react-i18next'

import TextInputLogin from '../formElements/textInputLogin.jsx'
import Spinner from '../common/spinner'
import Notification from '../modal/notification'
import {
  getCurrentUser,
  getErrorMessage,
  getLoadingStatus,
  resetErrors,
  updateCurrentUser
} from '../../store/authSlice'
import {generateUserData} from '../../utils/helpers'
import {validateValue} from '../../utils/validator'

const initUser = {
  name: '',
  image: ''
}

const ProfileForm = ({hideModal}) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const [data, setData] = useState(initUser)
  const serverErrorMessage = useSelector(getErrorMessage())
  const isLoading = useSelector((getLoadingStatus()))
  const [isSubmitted, setIsSubmitted] = useState(false)
  const currentUser = useSelector(getCurrentUser())
  const [errors, setErrors] = useState({})
  const [isTouched, setIsTouched] = useState({})
  const isValidForm = Object.values(errors).every(i => !Boolean(i))
  const [imageIsLoading, setImageIsLoading] = useState(true)

  const validatorConfig = {
    name: {
      isRequired: {message: t('NAME_REQUIRED')},
      min: {message: t('NAME_MIN', {num: 3}), value: 3}
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const newErrors = {}
    for (const [key, value] of Object.entries(data)) {
      const error = validateValue(value, validatorConfig[key])
      if (error) {
        newErrors[key] = error
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

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

  const handleChange = (field) => {
    setData(prev => ({
      ...prev,
      [field.name]: field.value
    }))
  }

  const handleBlur = (field) => {
    setIsTouched(prev => ({
      ...prev,
      [field.name]: true
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isValidForm) return

    dispatch(updateCurrentUser(data))
    setIsSubmitted(true)
  }

  const handleCancel = () => {
    dispatch(resetErrors())
    hideModal()
  }

  const randomChangeImage = () => {
    setData(prev => ({
      ...prev,
      image: generateUserData().image
    }))
    setImageIsLoading(true)
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

        {!isLoading
          ? <>
            <figure className="form__user-image">
              <div className="card-container">
                {imageIsLoading
                  && <Spinner/>}

                <img src={data.image}
                     alt="Authenticated user"
                     onClick={randomChangeImage}
                     onLoad={imageLoaded}/>
              </div>

              <figcaption>{t('CLICK_TO_CHANGE')}</figcaption>
            </figure>

            <TextInputLogin name="name"
                            label={t('NAME')}
                            value={data.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.name}
                            isTouched={isTouched.name}/>
          </>

          : <Spinner/>}

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
