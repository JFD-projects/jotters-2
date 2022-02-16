import React from 'react'
import ReactDOM from 'react-dom'

const Backdrop = ({onRemoveModal}) => {
  return (
    <div className='backdrop'
         onClick={onRemoveModal}/>
  )
}

const ModalOverlay = ({children, modalClass}) => {
  return (
    <div className={modalClass}>
      {children}
    </div>
  )
}

const Modal = ({children, onRemoveModal, modalClass}) => {
  const portal$ = document.querySelector('#overlays')
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onRemoveModal={onRemoveModal}/>, portal$)
      }
      {ReactDOM.createPortal(
        <ModalOverlay modalClass={modalClass}>
          {children}
        </ModalOverlay>, portal$)
      }
    </>
  )
}

export default Modal
