import { createSlice } from '@reduxjs/toolkit'

import publicNoteService from '../services/publicNoteService'
import errorService from '../services/errorService'
import { sortArrayBy } from '../utils/helpers'

const initialState = {
  entities: null,
  isLoading: true
}

const slice = createSlice({
  name: 'publicNotes',
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
    }
  }
})

const {requested, received, requestFailed} = slice.actions

export const loadPublicNotes = () => async (dispatch) => {
  dispatch(requested())
  try {
    const {data} = await publicNoteService.fetchAll()
    dispatch(received(data))
  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed())
  }
}

export const getPublicNoteById = (publicNoteId) => (state) => {
  return state.publicNotes.entities ? state.publicNotes.entities.find(p => p._id === publicNoteId) : null
}

export const getPublicNotesList = (sort) => (state) => {
  return sortArrayBy(sort, state.publicNotes.entities)
}

export const getLoadingStatus = () => (state) => {
  return state.publicNotes.isLoading
}

export default slice.reducer
