import { createSlice } from '@reduxjs/toolkit'

import noteService from '../services/noteService'
import errorService from '../services/errorService'
import { sortArrayBy } from '../utils/helpers'

const initialState = {
  entities: null,
  isLoading: true
}

const slice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    requested(state) {
      state.isLoading = true
    },
    received(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    requestFailed(state) {
      state.isLoading = false
    },
    added(state, action) {
      state.entities = state.entities ? [...state.entities, action.payload] : [action.payload]
      state.isLoading = false
    },
    updated(state, action) {
      state.entities = state.entities.map(i => i._id === action.payload._id
        ? {...i, ...action.payload}
        : i)
      state.isLoading = false
    },
    deleted(state, action) {
      state.entities = state.entities.filter(i => i._id !== action.payload)
      state.isLoading = false
    },
    clear(state) {
      state.entities = null
      state.isLoading = false
    }
  }
})

const {requested, received, requestFailed, added, updated, deleted, clear} = slice.actions

export const loadNotes = (jotterId) => async (dispatch) => {
  dispatch(requested())
  try {
    const {data} = await noteService.fetchAll(jotterId)
    dispatch(received(data))
  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed())
  }
}

export const updateNote = (note) => async (dispatch) => {
  dispatch(requested())
  try {
    const {data} = await noteService.update(note._id, note)
    dispatch(updated(data))
  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed())
  }
}

export const addNewNote = (note) => async (dispatch) => {
  dispatch(requested())
  try {
    const {data} = await noteService.add(note)
    dispatch(added(data))
    return data
  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed())
  }
}

export const deleteNote = (noteId) => async (dispatch) => {
  dispatch(requested())
  try {
    await noteService.delete(noteId)
    dispatch(deleted(noteId))
  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed())
  }
}

export const clearNotes = () => async (dispatch) => {
  dispatch(clear())
}

export const getNoteById = (noteId) => (state) => {
  return state.notes.entities ? state.notes.entities.find(n => n._id === noteId) : null
}

export const getNotesList = () => (state) => {
  return sortArrayBy('byDate', state.notes.entities)
}

export const getNotesLoadingStatus = () => (state) => {
  return state.notes.isLoading
}

export default slice.reducer
