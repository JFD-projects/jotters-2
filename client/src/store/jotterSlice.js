import { createSlice } from '@reduxjs/toolkit'

import jotterService from '../services/jotterService'
import errorService from '../services/errorService'
import { sortArrayBy, filterArrayBy } from '../utils/helpers'

const initialState = {
  entities: null,
  isLoading: true
}

const slice = createSlice({
  name: 'jotters',
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
    }
  }
})

const {requested, received, requestFailed, added, updated, deleted} = slice.actions

export const loadJotters = () => async (dispatch) => {
  dispatch(requested())
  try {
    const {data} = await jotterService.fetchAll()
    dispatch(received(data))
  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed())
  }
}

export const updateJotter = (jotter) => async (dispatch) => {
  dispatch(requested())
  try {
    const {data} = await jotterService.update(jotter._id, jotter)
    dispatch(updated(data))
  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed())
  }
}

export const addNewJotter = (jotter) => async (dispatch) => {
  dispatch(requested())
  try {
    const {data} = await jotterService.add(jotter)
    dispatch(added(data))
  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed())
  }
}

export const deleteJotter = (jotterId) => async (dispatch) => {
  dispatch(requested())
  try {
    await jotterService.delete(jotterId)
    dispatch(deleted(jotterId))
  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed())
  }
}

export const getJotterById = (jotterId) => (state) => {
  return state.jotters.entities ? state.jotters.entities.find(j => j._id === jotterId) : null
}

export const getJottersList = (filter, sort) => (state) => {
  return sortArrayBy(sort, filterArrayBy(filter, state.jotters.entities))
}

export const getJottersLoadingStatus = () => (state) => {
  return state.jotters.isLoading
}

export default slice.reducer
