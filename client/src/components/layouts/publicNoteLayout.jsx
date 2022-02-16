import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Layout from './common/layout'
import Note from '../pages/main/common/note'
import PublicNotesSidebar from '../pages/sidebar/publicNoteSidebar'
// import useNotes from '../../hooks/useNotes'
import { getLoadingStatus, getPublicNoteById } from '../../store/publicNoteSlice'

const PublicNoteLayout = () => {
  // const dispatch = useDispatch()
  // const [note, setNote] = useState()
  // const {getNote} = useNotes()
  const {noteId} = useParams()
  const note = useSelector(getPublicNoteById(noteId))
  const publicNotesIsLoading = useSelector(getLoadingStatus())

  // useEffect(() => {
  //   getNote(noteId).then((data) => setNote(data))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <Layout title={publicNotesIsLoading ? '...' : note.title}>
      <PublicNotesSidebar note={note}/>
      <Note note={note} type="PUBLIC"/>
    </Layout>
  )
}

export default PublicNoteLayout
