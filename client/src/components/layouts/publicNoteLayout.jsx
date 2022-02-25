import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Layout from './common/layout'
import Note from '../pages/main/common/note'
import PublicNoteSidebar from '../pages/sidebar/publicNoteSidebar'
import { getLoadingStatus, getPublicNoteById} from '../../store/publicNoteSlice'
import { updateBreadcrumbs } from '../../store/breadcrumbsSlice'
import { PUBLIC_BREADCRUMBS } from '../../utils/helpers'

const PublicNoteLayout = () => {
  const {noteId} = useParams()
  const dispatch = useDispatch()
  const note = useSelector(getPublicNoteById(noteId))
  const publicNotesIsLoading = useSelector(getLoadingStatus())

  useEffect(() => {
    const crumbs = PUBLIC_BREADCRUMBS.concat([{to: '/', label: note.title}])
    dispatch(updateBreadcrumbs(crumbs))
  }, [])

  return (
    <Layout title={publicNotesIsLoading ? '...' : note.title}>
      <PublicNoteSidebar note={note}/>
      <Note note={note} type="PUBLIC"/>
    </Layout>
  )
}

export default PublicNoteLayout
