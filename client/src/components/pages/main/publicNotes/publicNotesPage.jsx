import React from 'react'
import NoteCard from './noteCard'
import Spinner from '../../../common/spinner'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getLoadingStatus } from '../../../../store/publicNoteSlice'

const PublicNotesPage = ({notes}) => {
  const {t} = useTranslation()
  const publicNotesIsLoading = useSelector(getLoadingStatus())

  if (publicNotesIsLoading) {
    return <Spinner/>
  }

  return (
    notes.length > 0
      ?
      <div className="cards-container">
        {notes.map(note => <NoteCard key={note._id}
                                     note={note}/>)}
      </div>
      :
      <p className="no-card">
        {t('NO_NOTES')}
      </p>
  )
}

export default PublicNotesPage
