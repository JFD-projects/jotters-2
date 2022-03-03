import React from 'react'
import {FORM_DELETE_COMMENT, FORM_EDIT_COMMENT} from "../../../../utils/helpers"
import {useTranslation} from "react-i18next"
import DropdownBtn from "../../../formElements/dropdownBtn"
import {useSelector} from "react-redux"
import {getCurrentUserId} from "../../../../store/authSlice"
import {dateToStringForRender} from "../../../../utils/dateToString"

const Comment = ({comment, note}) => {
  const {t} = useTranslation()
  const currentUserId = useSelector(getCurrentUserId())

  //================================ PARAMS.DROPDOWN_BTN =======================
  const paramsDropdownBtn = {
    img: <svg className="dropdown__icon dropdown__icon--primary">
      <use xlinkHref="/sprite.svg#icon-settings"/>
    </svg>,
    title: t('CONTROL'),
    data: {comment, note},
    items: [
      {
        action: FORM_EDIT_COMMENT,
        title: t('EDIT_COMMENT'),
        img: <svg className="dropdown-item__icon">
          <use xlinkHref="/sprite.svg#icon-pencil"/>
        </svg>,
        disabled: false
      },
      {
        action: FORM_DELETE_COMMENT,
        title: t('DELETE_COMMENT'),
        img: <svg className="dropdown-item__icon">
          <use xlinkHref="/sprite.svg#icon-bin"/>
        </svg>,
        disabled: false
      }
    ]
  }
  //================================


  return (
    <div className="card-container">
      <article key={comment._id} className="comment">
        <div className="comment__header">
          <img className="comment__image"
               src={comment.userImage}
               alt="User"/>
          <span className="comment__name">
              {comment.userName}
            </span>
          <span className="comment__date">
              {dateToStringForRender(comment.createdAt, Date.now())}
            </span>
        </div>
        <p className="comment__context">
          {comment.content}
        </p>
      </article>

      {comment.userId === currentUserId &&
        <DropdownBtn params={paramsDropdownBtn}/>}
    </div>
  )
}

export default Comment
