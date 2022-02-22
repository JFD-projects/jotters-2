import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import TextInputLogin from '../../../formElements/textInputLogin.jsx'
import Spinner from '../../../common/spinner'
import Notification from '../../../modal/notification'
import {useLogin} from '../../../../hooks/useLogin'
import { getErrorMessage, getLoadingStatus, register, resetErrors } from '../../../../store/authSlice'

const RegisterForm = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {data, isValidForm, reset, setFormType} = useLogin()
  const serverErrorMessage = useSelector(getErrorMessage())
  const isLoading = useSelector((getLoadingStatus()))
  const [isSubmitted, setIsSubmitted] = useState(false)
  const history = useHistory()

  useEffect(()=>{
    setFormType('register')
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isValidForm) return

    dispatch(register(data))
    setIsSubmitted(true)
  }

  const handleCancel = () => {
    reset()
    dispatch(resetErrors())
    history.goBack()
  }

  return (
    <Notification onRemoveModal={handleCancel}>
      <form onSubmit={handleSubmit}
            className="form">

        <h1 className="form__title">
          {t('REGISTER')}
        </h1>

        {data
          ? <>
            <TextInputLogin name="name"
                            label={t('NAME')}/>

            <TextInputLogin name="email"
                            label={t('EMAIL')}/>

            <TextInputLogin name="password"
                            label={t('PASSWORD')}
                            type="password"/>

            <TextInputLogin name="passwordConfirm"
                            label={t('PASSWORD_CONFIRM')}
                            type="password"/>
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

export default RegisterForm
