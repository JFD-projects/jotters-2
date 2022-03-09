import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Spinner from '../common/spinner'
import Notification from '../modal/notification'
import { validateValue } from '../../utils/validator'
import {addNewComment, getLoadingStatus, updateComment} from '../../store/commentSlice'
import { getCurrentUser } from '../../store/authSlice'
import TextArea from '../formElements/textArea'

const initComment = {
  content: ''
}

const CommentForm = ({hideModal, note, comment}) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const [data, setData] = useState(comment ?? initComment)
  const isLoading = useSelector((getLoadingStatus()))
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [isTouched, setIsTouched] = useState({})
  const isValidForm = Object.values(errors).every(i => !Boolean(i))
  const currentUser = useSelector(getCurrentUser())

  const validatorConfig = {
    content: {
      isRequired: {message: t('COMMENT_REQUIRED')}
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const newErrors = {}
    for (const [key, value] of Object.entries(data)) {
      const error = validateValue(value, validatorConfig[key])
      if (error) {
        newErrors[key] = error
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  useEffect(() => {
    if (isLoading) {
      return
    }
    // Close form only if form is submitted
    if (isSubmitted) {
      handleCancel()
    }
    setIsSubmitted(false)
  }, [isLoading])

  const handleChange = (field) => {
    setData(prev => ({
      ...prev,
      [field.name]: field.value
    }))
  }

  const handleBlur = (field) => {
    setIsTouched(prev => ({
      ...prev,
      [field.name]: true
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isValidForm) return

    if (comment) {
      dispatch(updateComment({
        _id: comment._id,
        content: data.content
      }, currentUser))
    } else {
      dispatch(addNewComment({
        content: data.content,
        noteId: note._id
      }, currentUser))
    }
    setIsSubmitted(true)
  }

  const handleCancel = () => {
    hideModal()
  }

  return (
    <Notification onRemoveModal={handleCancel}>
      <form onSubmit={handleSubmit}
            className="form form__comment">

        <h1 className="form__title">
          {note.title}
        </h1>

        {!isLoading
          ? <>
            <TextArea name="content"
                      label={t('COMMENT')}
                      value={data.content}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.content}
                      isTouched={isTouched.content}/>
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

export default CommentForm
