import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Layout from './common/layout'
import Note from '../pages/main/common/note'
import JotterNotesSidebar from '../pages/sidebar/jotterNotesSidebar/jotterNotesSidebar'
import useNoteControlDropdown from '../../hooks/useNoteControlDropdown'

import { loadJotters, getJotterById, getJottersLoadingStatus } from '../../store/jotterSlice'
import {
  loadNotes, updateNote, deleteNote, addNewNote,
  getNotesList, getNotesLoadingStatus, getNoteById
} from '../../store/noteSlice'
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

  const {
    paramsDropdownBtn, hideDeleteConfirm, renderControlDropdown
  } = useNoteControlDropdown(handleDeleteNote, handleUpdateNote, selectedNote)

  const history = useHistory()

  useEffect(() => {
    // On jump from Public note
    if (!jotter) {
      dispatch(loadJotters())
    }
  }, [])

  useEffect(() => {
    dispatch(loadNotes(jotterId))
  }, [jotterId])

  // On add or delete note. And first render.
  useEffect(() => {
    if (notes?.length > 0) {
      history.push(`/jotters/${jotterId}/${notes[0]._id}`)
    }
  }, [notes?.length])

  async function handleUpdateNote(note) {
    dispatch(updateNote(note))
  }

  const handleCreateNewNote = async () => {
    dispatch(addNewNote({jotterId, title: t('MY_NEW_NOTE')}))
  }

  function handleDeleteNote(note) {
    dispatch(deleteNote(note._id))
    hideDeleteConfirm()
  }

  return (<>
    <Layout title={jotter ? jotter.title : '...'}>
      <JotterNotesSidebar onCreateNewNote={handleCreateNewNote}/>

      {(jottersIsLoading || notesIsLoading)
        ? <Spinner/>

        : (!notes || notes.length === 0)

          ? <p className="no-card">
            {t('CREATE_NEW_NOTE')}
          </p>

          : <Note note={selectedNote}
                  type="PRIVATE"
                  onUpdate={handleUpdateNote}
                  paramsDropdownBtn={paramsDropdownBtn}/>
      }

    </Layout>

    {renderControlDropdown}
  </>)
}

export default NotesLayout
