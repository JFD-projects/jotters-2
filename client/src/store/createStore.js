import { combineReducers, configureStore } from '@reduxjs/toolkit'
import jotters from './jotterSlice'
import notes from './noteSlice'
import info from './infoSlice'
import auth from './authSlice'
import publicNotes from './publicNoteSlice'
import modal from './modalSlice'
import breadcrumbs from './breadcrumbsSlice'

const rootReducer = combineReducers({
  info,
  jotters,
  notes,
  auth,
  publicNotes,
  modal,
  breadcrumbs
})

function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}

export default createStore
