import React from 'react'
import TextInputLogin from '../../../formElements/textInputLogin.jsx'
import Spinner from '../../../common/spinner'
import Notification from '../../../modal/notification'
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router-dom'
import {useLogin} from '../../../../hooks/useLogin'
import { useDispatch } from 'react-redux'
import {register} from '../../../../store/authSlice'

const RegisterForm = ({onRemoveModal}) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {data, setErrors, isValidForm, reset} = useLogin()
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isValidForm) return

    // try {
    //   await register(data)
    //   history.push('/')
    //   reset()
    //   onRemoveModal()
    // } catch (err) {
    //   setErrors(err)
    // }

    dispatch(register(data))
  }

  const handleCancel = () => {
    reset()
    onRemoveModal()
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
