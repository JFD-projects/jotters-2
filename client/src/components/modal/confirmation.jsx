import React from 'react'
import { useTranslation } from 'react-i18next'

import Notification from './notification'

const Confirmation = ({hideModal, header, content, action, onConfirm}) => {
  const {t} = useTranslation()

  return (
    <Notification onRemoveModal={hideModal}>
      <div className="card-body">

        <h1 className="form__title">
          {header}
        </h1>

        <p className="form__content">
          {content}
        </p>

        <div className="btn-block">
          <button type="button"
                  className="btn btn--primary w-33"
                  onClick={hideModal}>
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
