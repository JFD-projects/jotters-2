import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Spinner from '../../../common/spinner'
import QuillCard from '../../../quill/quillCard'
import { useDispatch } from 'react-redux'
import { updateNote } from '../../../../store/noteSlice'
import { FORM_ADD_COMMENT, FORM_DELETE_NOTE, FORM_NOTE_SETTINGS } from '../../../../utils/helpers'
import { updateInfoNote } from '../../../../store/infoSlice'
import { showModal } from '../../../../store/modalSlice'
import Comments from '../comments'

const Note = ({note, type, isAdmin = false}) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const [content, setContent] = useState('')
  const [readOnly, setReadOnly] = useState(true)
  const [beforeEdit, setBeforeEdit] = useState({})

  useEffect(() => {
    if (note) {
      setContent(note.content)
    }
  }, [note])

  //================================ PARAMS.DROPDOWN_BTN =======================
  const paramsDropdownBtn = {
    img: <svg className="dropdown__icon dropdown__icon--primary">
      <use xlinkHref="/sprite.svg#icon-circle-down"/>
    </svg>,
    title: t('CONTROL'),
    data: note,
    items: [
      {
        action: FORM_NOTE_SETTINGS,
        title: t('SETTINGS'),
        img: <svg className="dropdown-item__icon">
          <use xlinkHref="/sprite.svg#icon-settings"/>
        </svg>,
        disabled: false
      },
      {
        action: FORM_DELETE_NOTE,
        title: t('DELETE_NOTE'),
        img: <svg className="dropdown-item__icon">
          <use xlinkHref="/sprite.svg#icon-bin"/>
        </svg>,
        disabled: false
      }
    ]
  }
  //================================

  const handleChange = (content) => {
    setContent(content)
  }

  const handleBtnEdit = () => {
    setBeforeEdit({content, lng: note.lng})
    setReadOnly(false)
  }

  const handleBtnSave = async () => {
    if (type === 'INFO') {
      dispatch(updateInfoNote({
        lng: beforeEdit.lng,
        content
      }))
    } else if (type === 'PRIVATE' || type === 'PUBLIC') {
      dispatch(updateNote({
        _id: note._id,
        content
      }))
    }
    setReadOnly(true)
  }

  const handleBtnCancel = () => {
    setContent(beforeEdit.content)
    setReadOnly(true)
  }

  const handleBtnAddComment = () => {
    dispatch(showModal({currentModal: FORM_ADD_COMMENT, data: note}))
  }

  if (content === undefined) {
    return <Spinner/>
  }

  return (
    <div className="note-page">
      <QuillCard readOnly={readOnly}
                 type={type}
                 value={content}
                 onChange={handleChange}
                 paramsDropdownBtn={paramsDropdownBtn}/>

      {(type === 'PRIVATE' || (type === 'INFO' && isAdmin)) &&
      <div className="btn-block">
        {readOnly
          ? <>
            <button className="btn btn--secondary w-33"
                    onClick={handleBtnEdit}>
              {t('EDIT')}
            </button>
          </>

          : <>
            <button className="btn btn--primary w-33"
                    onClick={handleBtnCancel}>
              {t('CANCEL')}
            </button>
            <button className="btn btn--secondary w-33"
                    onClick={handleBtnSave}>
              {t('SAVE')}
            </button>
          </>
        }
      </div>
      }

      {type === 'PUBLIC' && note &&
      <>
        <div className="btn-block">
          <button className="btn btn--primary w-50"
                  onClick={handleBtnAddComment}>
            {t('ADD_COMMENT')}
          </button>
        </div>

        <Comments noteId={note._id}/>
      </>
      }
    </div>
  )
}

export default Note
