import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Layout from './common/layout'
import Note from '../pages/main/common/note'
import PublicNoteSidebar from '../pages/sidebar/publicNoteSidebar'
import { getLoadingStatus, getPublicNoteById} from '../../store/publicNoteSlice'

const PublicNoteLayout = () => {
  const {noteId} = useParams()
  const note = useSelector(getPublicNoteById(noteId))
  const publicNotesIsLoading = useSelector(getLoadingStatus())

  return (
    <Layout title={publicNotesIsLoading ? '...' : note.title}>
      <PublicNoteSidebar note={note}/>
      <Note note={note} type="PUBLIC"/>
    </Layout>
  )
}

export default PublicNoteLayout
