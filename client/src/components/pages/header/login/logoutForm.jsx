import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Notification from '../../../modal/notification'
import { getLoadingStatus, logout } from '../../../../store/authSlice'
import { useLogin } from '../../../../hooks/useLogin'
import Spinner from '../../../common/spinner'

const LogoutForm = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {setFormType} = useLogin()
  const isLoading = useSelector((getLoadingStatus()))
  const history = useHistory()

  useEffect(() => {
    setFormType('logout')
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(logout())
    history.goBack()
  }

  const handleCancel = () => {
    history.goBack()
  }

  return (
    <Notification onRemoveModal={handleCancel}>
      <form onSubmit={handleSubmit}
            className="form">

        <h1 className="form__title">
          {t('LOG_OUT')}
        </h1>

        {isLoading &&
        <Spinner/>}

        <div className="btn-block">
          <button type="button"
                  className="btn btn--primary w-33"
                  onClick={handleCancel}>
            {t('CANCEL')}
          </button>

          <button type="submit"
                  className="btn btn--secondary w-33">
            {t('SUBMIT')}
          </button>
        </div>
      </form>
    </Notification>
  )
}

export default LogoutForm
