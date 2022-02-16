import React from 'react'
import { useTranslation } from 'react-i18next'

import Notification from './notification'

const Confirmation = ({header, context, action, onConfirm, onCancel}) => {
  const {t} = useTranslation()

  return (
    <Notification onRemoveModal={onCancel}>
      <div className="card-body">

        <h1 className="form__title">
          {header}
        </h1>

        <h2 className="form__title">
          {context}
        </h2>

        <div className="btn-block">
          <button type="button"
                  className="btn btn--primary w-33"
                  onClick={onCancel}>
            {t('CANCEL')}
          </button>

          <button type="button"
                  className="btn btn--secondary w-33"
                  onClick={onConfirm}>
            {action}
          </button>
        </div>

      </div>
    </Notification>
  )
}

export default Confirmation
