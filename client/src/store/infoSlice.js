import { createSlice } from '@reduxjs/toolkit'

import errorService from '../services/errorService'
import infoService from '../services/infoService'

const initialState = {
  infoNote: null,
  isLoading: true
}

const slice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    requested(state) {
      state.isLoading = true
    },
    received(state, action) {
      state.infoNote = action.payload
      state.isLoading = false
    },
    requestFailed(state) {
      state.isLoading = false
    }
  }
})

const {requested, received, requestFailed} = slice.actions

export const loadInfoNote = (lng) => async (dispatch) => {
  dispatch(requested())
  try {
    const {data} = await infoService.get(lng)
    dispatch(received(data))
  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed())
  }
}

export const updateInfoNote = (note) => async (dispatch) => {
  dispatch(requested())
  try {
    const {data} = await infoService.update(note)
    dispatch(received(data))
  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed())
  }
}

export const getInfoNote = () => (state) => {
  return state.info.infoNote
}

export const getInfoNotesLoadingStatus = () => (state) => {
  return state.info.isLoading
}

export default slice.reducer
