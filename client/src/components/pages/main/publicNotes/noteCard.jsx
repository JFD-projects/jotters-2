import React from 'react'
import { useTranslation } from 'react-i18next'

import { Link } from 'react-router-dom'
import { dateToString } from '../../../../utils/dateToString'
import { htmlToPlain } from '../../../../utils/htmlToPlain'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../../../../store/authSlice'

const NoteCard = ({note}) => {
  const {t} = useTranslation()
  const currentUser = useSelector(getCurrentUser())
  const isOwnNote = (note.userId === currentUser?._id)
  const summary = htmlToPlain(note.content).slice(note.title.length, note.title.length + 130) + '...'

  return (
    <Link to={`/public/${note._id}`}
          className={'card note-card' + (isOwnNote ? ' own-note' : '')}>

      {isOwnNote &&
      <span className="badge-secondary">
          {t('MY_NOTE')}
      </span>}

      <span className="note-card__title">
        {note.title}
      </span>

      <p className="note-card__text">
        {summary}
      </p>

      <p className="note-card__name">
        {note.userName}
      </p>

      <p className="note-card__date">
        {dateToString(note.updatedAt)}
      </p>
    </Link>
  )
}

export default NoteCard
