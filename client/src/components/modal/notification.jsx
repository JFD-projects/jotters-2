import React from 'react'

import Modal from './modal'

const Notification = ({children, onRemoveModal}) => {
  return (
    <Modal modalClass='modal-notification'
           onRemoveModal={onRemoveModal}>
      {children}
    </Modal>
  )
}

export default Notification
