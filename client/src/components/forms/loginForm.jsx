import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'


import TextInputLogin from '../formElements/textInputLogin'
import Spinner from '../common/spinner'
import Notification from '../modal/notification'
import { getErrorMessage, getLoadingStatus, login, resetErrors } from '../../store/authSlice'
import { validateValue } from '../../utils/validator'

const initUser = {
  email: '',
  password: ''
}

const LoginForm = ({hideModal}) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const [data, setData] = useState(initUser)
  const serverErrorMessage = useSelector(getErrorMessage())
  const isLoading = useSelector((getLoadingStatus()))
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [isTouched, setIsTouched] = useState({})
  const isValidForm = Object.values(errors).every(i => !Boolean(i))

  const validatorConfig = {
    email: {
      isRequired: {message: t('EMAIL_REQUIRED')},
      isEmail: {message: t('EMAIL_WRONG')}
    },
    password: {
      isRequired: {message: t('PASSWORD_REQUIRED')}
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

  // const reset = () => {
  //   setData(initUser)
  //   setIsTouched({})
  // }

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

    dispatch(login(data))
    setIsSubmitted(true)
  }

  const handleCancel = () => {
    // reset()
    dispatch(resetErrors())
    hideModal()
  }

  return (
    <Notification onRemoveModal={handleCancel}>
      <form onSubmit={handleSubmit}
            className="form">

        <h1 className="form__title">
          {t('LOG_IN')}
        </h1>

        {!isLoading
          ? <>
            <TextInputLogin name="email"
                            label={t('EMAIL')}
                            value={data.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.email}
                            isTouched={isTouched.email}/>

            <TextInputLogin name="password"
                            label={t('PASSWORD')}
                            type="password"
                            value={data.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.password}
                            isTouched={isTouched.password}/>
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

export default LoginForm
