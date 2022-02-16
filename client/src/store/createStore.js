import { combineReducers, configureStore } from '@reduxjs/toolkit'
import jotters from './jotterSlice'
import notes from './noteSlice'
import info from './infoSlice'
import auth from './authSlice'
import publicNotes from './publicNoteSlice'

const rootReducer = combineReducers({
  info,
  jotters,
  notes,
  auth,
  publicNotes
})

function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}

export default createStore
