import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Spinner from '../../../common/spinner'
import QuillCard from '../../../quill/quillCard'
// import DropdownBtn from '../../common/form/dropdownBtn'

const Note = ({note, type, onUpdate, paramsDropdownBtn, isAdmin = false}) => {
  const {t} = useTranslation()
  const [content, setContent] = useState('')
  const [readOnly, setReadOnly] = useState(true)
  const [beforeEdit, setBeforeEdit] = useState({})

  useEffect(() => {
    if (note) {
      setContent(note.content)
    }
  }, [note])

  const handleChange = (content) => {
    setContent(content)
  }

  const handleBtnEdit = () => {
    setBeforeEdit({content, lng: note.lng})
    setReadOnly(false)
  }

  const handleBtnSave = async () => {
    if (type === 'INFO') {
      onUpdate({
        lng: beforeEdit.lng,
        content
      })
    } else if (type === 'PRIVATE' || type === 'PUBLIC') {
      onUpdate({
        _id: note._id,
        content
      })
    }
    setReadOnly(true)
  }

  const handleBtnCancel = () => {
    setContent(beforeEdit.content)
    setReadOnly(true)
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
    </div>
  )
}

export default Note
