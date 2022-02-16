import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NoteItem = ({note, onHideMobileSideBar}) => {
  const {t} = useTranslation()
  const {jotterId} = useParams()

  return (
    <li className='note-item'>
      <NavLink to={`/jotters/${jotterId}/${note._id}`}
               className={'note-item__link' + (note.isPublic ? ' public' : '')}
               onClick={onHideMobileSideBar}>

        <span className="badge-secondary">
          {t('PUBLIC')}
        </span>

        {note.title}
      </NavLink>

    </li>
  )
}

export default NoteItem
