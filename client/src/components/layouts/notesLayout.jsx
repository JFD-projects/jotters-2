import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Layout from './common/layout'
import Note from '../pages/main/common/note'
import JotterNotesSidebar from '../pages/sidebar/jotterNotesSidebar/jotterNotesSidebar'

import { loadJotters, getJotterById, getJottersLoadingStatus } from '../../store/jotterSlice'
import { loadNotes, getNotesList, getNotesLoadingStatus, getNoteById } from '../../store/noteSlice'
import Spinner from '../common/spinner'

const NotesLayout = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const notes = useSelector(getNotesList())
  const notesIsLoading = useSelector(getNotesLoadingStatus())
  const jottersIsLoading = useSelector(getJottersLoadingStatus())

  const {jotterId, noteId} = useParams()
  const jotter = useSelector(getJotterById(jotterId))
  const selectedNote = useSelector(getNoteById(noteId))

  const history = useHistory()

  useEffect(() => {
    // In case of jump from Public note
    if (!jotter) {
      dispatch(loadJotters())
    }
  }, [])

  useEffect(() => {
    dispatch(loadNotes(jotterId))
  }, [jotterId])

  // In case of add or delete note. And first render.
  useEffect(() => {
    if (notes?.length > 0) {
      if (selectedNote) {
        history.push(`/jotters/${jotterId}/${noteId}`)
      } else {
        history.push(`/jotters/${jotterId}/${notes[0]._id}`)
      }
    }
  }, [notes?.length])

  return (<>
    <Layout title={jotter ? jotter.title : '...'}>
      <JotterNotesSidebar jotterId={jotterId}/>

      {(jottersIsLoading || notesIsLoading)
        ? <Spinner/>

        : (!notes || notes.length === 0)

          ? <p className="no-card">
            {t('CREATE_NEW_NOTE')}
          </p>

          : <Note note={selectedNote}
                  type="PRIVATE"/>}
    </Layout>
  </>)
}

export default NotesLayout
