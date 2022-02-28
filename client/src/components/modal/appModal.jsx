import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import {
  FORM_LOGIN, FORM_REGISTER, FORM_PROFILE, FORM_LOGOUT,
  FORM_JOTTER_SETTINGS, FORM_DELETE_JOTTER,
  FORM_NOTE_SETTINGS, FORM_DELETE_NOTE,
  FORM_ADD_COMMENT
} from '../../utils/helpers'
import LoginForm from '../forms/loginForm'
import RegisterForm from '../forms/registerForm'
import LogoutForm from '../forms/logoutForm'
import ProfileForm from '../forms/profileForm'
import JotterSettings from '../forms/jotterSettings'
import NoteSettings from '../forms/noteSettings'
import Confirmation from './confirmation'
import { getPayload, hideModal } from '../../store/modalSlice'
import { deleteJotter } from '../../store/jotterSlice'
import { deleteNote } from '../../store/noteSlice'
import CommentForm from '../forms/commentForm'

const AppModal = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {currentModal, data} = useSelector(getPayload())

  const handleHideModal = () => {
    dispatch(hideModal())
  }

  const handleDeleteJotter = (id) => {
    dispatch(deleteJotter(id))
    handleHideModal()
  }

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id))
    handleHideModal()
  }

  return (
    <>
      {currentModal === FORM_LOGIN &&
      <LoginForm hideModal={handleHideModal}/>}

      {currentModal === FORM_REGISTER &&
      <RegisterForm hideModal={handleHideModal}/>}

      {currentModal === FORM_PROFILE &&
      <ProfileForm hideModal={handleHideModal}/>}

      {currentModal === FORM_LOGOUT &&
      <LogoutForm hideModal={handleHideModal}/>}

      {currentModal === FORM_JOTTER_SETTINGS &&
      <JotterSettings hideModal={handleHideModal} jotter={data}/>}

      {currentModal === FORM_DELETE_JOTTER &&
      <Confirmation hideModal={handleHideModal}
                    header={t('DELETE_JOTTER')}
                    context={`${data.title}`}
                    action={t('DELETE')}
                    onConfirm={() => handleDeleteJotter(data._id)}/>}

      {currentModal === FORM_NOTE_SETTINGS &&
      <NoteSettings hideModal={handleHideModal} note={data}/>}

      {currentModal === FORM_DELETE_NOTE &&
      <Confirmation hideModal={handleHideModal}
                    header={t('DELETE_NOTE')}
                    context={`${data.title}`}
                    action={t('DELETE')}
                    onConfirm={() => handleDeleteNote(data._id)}/>}

      {currentModal === FORM_ADD_COMMENT &&
      <CommentForm hideModal={handleHideModal} note={data}/>}
    </>
  )
}

export default AppModal
